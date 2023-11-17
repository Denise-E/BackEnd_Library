import Joi from 'joi' // https://joi.dev/

export const validate = books => {

    const booksSchema = Joi.object({
        title: Joi.string().min(2).required(),
        author: Joi.string().min(2).required(),
        stock: Joi.number().integer().min(0).max(50).required()
    })

    const { error } = booksSchema.validate(books)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}