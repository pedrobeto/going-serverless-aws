const dynamoose = require('dynamoose')

function setupDynamoDBClient() {
    if (!process.env.IS_LOCAL) {
        return;
    }

    const host = process.env.LOCALSTACK_HOST;
    const port = process.env.DYNAMODB_PORT;
    const endpoint = `http://${host}:${port}`;

    console.log("running dynamodb locally!!", endpoint);

    dynamoose.aws.sdk.config.update({
        accessKeyId: "DEFAULT_ACCESS_KEY",
        secretAccessKey: "DEFAULT_SECRET_ACCESS_KEY",
    });

    return dynamoose.aws.ddb.local(endpoint);
}

module.exports = setupDynamoDBClient