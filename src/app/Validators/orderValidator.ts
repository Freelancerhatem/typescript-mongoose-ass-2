import Joi from 'joi';

export const orderSchema = Joi.object({
    email: Joi.string().email().required(),
    productID: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
});
