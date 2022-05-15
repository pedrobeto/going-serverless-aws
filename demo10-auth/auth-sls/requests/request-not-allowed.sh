#HOST=http://0.0.0.0:3000
HOST=https://nt8q854za6.execute-api.us-east-1.amazonaws.com

TOKEN=$(curl -X POST \
    --silent \
    -H 'Content-Type: application/json' \
    --data '{"username": "ronaldinho", "password": "123"}' \
    $HOST/login \
    | jq '.token' \
    | sed 's/"//g' \
    | tee token.log
)

echo "Token: $TOKEN"
echo 

curl --silent $HOST/public | xargs echo "Public API: $1"

curl \
    --silent \
    -H "Authorization:$TOKEN" \
    $HOST/private \
    | xargs echo "Private API: $1"
echo

