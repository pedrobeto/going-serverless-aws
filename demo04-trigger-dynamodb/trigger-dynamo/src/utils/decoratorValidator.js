const decoratorValidator = (fn, schema, argsType) => {
    return async function (event) {
        const data = JSON.parse(event[argsType])
        const { error, value } = await schema.validate(
            data, { abortEarly: true }
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