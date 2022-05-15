const {
    HeroiSchema,
    sequelize
} = require('./database')
const handler = async event => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully')
    } catch (error) {
        console.log('Unable to connect to the database', error.stack)
        return {
            statusCode: 500,
            body: 'ERRR'
        }
    }

    await HeroiSchema.sync()
    const result = await HeroiSchema.create({
        nome: 'Flash',
        poder: 'Speed'
    })

    const all = await HeroiSchema.findAll({
        raw: true,
        attributes: ['nome', 'poder', 'id']
    })

    return {
        body: JSON.stringify({
            result,
            all
        })
    }
}

exports.handler = handler