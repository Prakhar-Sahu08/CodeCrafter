const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = 'fill the input details properly';
        const extraDetails = err.errors && err.errors.length > 0 ? err.errors[0].message : 'Invalid input';
        const error = {
            status,
            message,
            extraDetails,
        };
        console.log(error);
        //res.status(422).json({message: message});
        next(error);

    }
};

module.exports = validate;