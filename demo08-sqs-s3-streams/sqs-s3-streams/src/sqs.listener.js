class Handler {
    async main(event) {
        const [{ body, messageId }] = event.Records;
        const item = JSON.parse(body);
        try {
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        ...item,
                        messageId,
                        at: new Date().toISOString()
                    },
                    null,
                    2
                )
            }
        } catch (error) {
            console.log({error})
            return {
                statusCode: 500,
                body: 'Internal server error!'
            }
        }
    }
}

const handler = new Handler();
module.exports = handler.main.bind(handler);