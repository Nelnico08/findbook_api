import { NextFunction, Request, Response } from 'express';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51LVe0zAGQWexCcfnyjpKZPXvqLCmt9F8TeetqhZg8jUBhc4g6Df969aunoZCtx8Nnyp77Tw65XwdpeQdg2c3Qekt00HoLmDTWF');



export const paymentInt = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {

    try {
        const intent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'eur',
            automatic_payment_methods: {enabled: true},
          });
        res.json({client_secret: intent.client_secret});
    } catch (error) {
        next(error);
    }
  };
