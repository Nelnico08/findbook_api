import { NextFunction, Request, Response } from 'express';

export const deleteBookAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params
    const { name, author, category, pages, publisher, description, image, price, released, language } = req.body


    // const result = await Project.update(
    //     { title: 'a very different title now' },
    //     { where: { _id: 1 } }
    // )
}