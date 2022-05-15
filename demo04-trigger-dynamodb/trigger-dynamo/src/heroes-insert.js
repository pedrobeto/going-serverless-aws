const uuid = require('uuid');
const Joi = require('@hapi/joi')
const decoratorValidator = require('./utils/decoratorValidator')
const globalEnum = require('./utils/globalEnum')
class Handler {
    constructor({ dynamoDbSvc }) {
        this.dynamoDbSvc = dynamoDbSvc;
        this.dynamoDbTable = process.env.DYNAMODB_TABLE
    }
    static validator() {
        return Joi.object({
            nome: Joi.string().max(100).min(2).required(),
            poder: Joi.string().max(20).required(),
        })
    }
    async insertItem(params) {
        return this.dynamoDbSvc.put(params).promise()
    }
    prepareData(data) {
        const params = {
            TableName: this.dynamoDbTable,
            Item: {
                ...data,
                id: uuid.v1(),
                createdAt: new Date().toISOString(),
            }
        }
        return params;
    }

    handlerSuccess(data) {
        const response = {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    }

    handlerError(data) {
        const response = {
            statusCode: data.statusCode || 500,
            body: 'Couldn\'t create item!',
            headers: { 'Content-Type': 'text/plain' }
        }
    }
    
    async main(event) {
        try {
            const dbParams = this.prepareData(event.body);
            
            // return {
            //     statusCode: 200,
            // }

            await this.insertItem(dbParams)

            return this.handlerSuccess(dbParams.Item)
        } catch (error) {
            console.log('DEU MERDA: ', error.stack)
            return this.handlerError({ statusCode: 500 })
        }
    }
}

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const handler = new Handler({
    dynamoDbSvc: dynamoDB
});
module.exports = decoratorValidator(
    handler.main.bind(handler),
    Handler.validator(),
    globalEnum.ARG_TYPE.BODY
);