import Joi from 'joi' // https://joi.dev/

export const validate = reservations => {

    const reservationsSchema = Joi.object({
        user_email: Joi.string().email().required(),
        id_book: Joi.string().hex().length(24).required()
    })

    const { error } = reservationsSchema.validate(reservations)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}