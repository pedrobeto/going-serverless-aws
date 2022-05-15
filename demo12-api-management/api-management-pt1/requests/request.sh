HOST=http://localhost:3000
HOST=https://h30tk30qza.execute-api.us-east-1.amazonaws.com
APIKEY="52uNAgtlIa14RZNDxBKcxaWhwkd0usvA0oRCIWic"
curl --silent \
    -H "x-api-key: $APIKEY" \
    $HOST/dev/hello