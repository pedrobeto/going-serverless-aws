const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const { buildIAMPolicy } = require('./lib/util')
const myRoles = {
    // role name vs function name
    'heroes:list': 'private'
}
const authorizeUser = (userScopes, routeArn) => {
    console.log({userScopes, routeArn});
    return userScopes.find(
        scope => ~routeArn.indexOf(myRoles[scope])
    )
}

exports.handler = async event => {
    console.log(JSON.stringify(event));
    const token = event.headers.authorization;

    try {
        const decodedUser = jwt.verify(
            token, JWT_KEY
        )
         
        const user = decodedUser.user
        console.log(user);
        const userId = user.username
        console.log(event.routeArn);
        const isAllowed = authorizeUser(
            user.scopes,
            event.routeArn
        )

        // dado que irá nas requests
        const authorizerContext = {
            user: JSON.stringify(user)
        }
        const policyDocument = buildIAMPolicy(
            userId,
            isAllowed ? 'Allow': 'Deny',
            event.routeArn,
            authorizerContext
        ) 
        return policyDocument
    } catch (error) {
        console.log('auth error**', error.stack)
        // 401 -> token invalido ou expirado
        // 403 -> token sem permissão pra acessar a função!

        return {
            statusCode: 401,
            body: error.stack
        }
    }
}