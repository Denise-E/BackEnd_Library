import Joi from 'joi' // https://joi.dev/

export const validate = users => {

    const usersSchema = Joi.object({
        name: Joi.string().min(1).required(), 
		admin:Joi.boolean().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(5).max(15).required()
    })

    const { error } = usersSchema.validate(users)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}