const decoratorValidator = (fn, schema, argsType) => {
    return async function (event) {
        const item = event[argsType];
        const data = argsType === "body" ? JSON.parse(item) : item;
        
        const { error, value } = await schema.validate(
            data, { abortEarly: false }
        )
        
        // change args instance
        event[argsType] = value
        
        // apply returns function to be next executed
        // with all arguments received in here
        if (!error) return fn.apply(this, arguments)
    
        return {
            statusCode: 422, // unprocessable entity
            body: error.message
        }
    }
}

module.exports = decoratorValidator