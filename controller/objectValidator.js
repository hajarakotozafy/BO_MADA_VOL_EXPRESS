const Joi = require('joi');

const validateAvion = (avion) => {
    const schema = Joi.object({
        designation: Joi.string().min(3).required(),
        nbPlaces: Joi.number().integer().required(),
        numVol: Joi.required()
    });
    return schema.validate(avion);
}

module.exports = {
    validateAvion
}