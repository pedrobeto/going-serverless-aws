const privateUsers = async () => {
    // you may use dynamodb in here

    return [
        'beto@beto.com',
        'ana@ana.com',
        'teste'
    ]
}

exports.private = privateUsers