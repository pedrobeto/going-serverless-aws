HOST=http://localhost:3000
HOST="https://9hxxbj0fjj.execute-api.us-east-1.amazonaws.com"
APIKEY="j5o3QFKaoG9bRSOCns0Ai900CpJYrJfC5mU2a7eB"
APIKEY="PuChTo9Bjka6nu1NzH4yr8MgGJsSs4605HcEoEVh"
echo "Press <CTRL + C> to exit"
while :
do 
    curl --silent \
        -H "x-api-key: $APIKEY" \
        $HOST/dev/hello
done

curl --silent \
    $HOST/dev/getUsagePlans | tee getUsagePlans.log 

# from getUsagePlans
USAGE_PLAN_ID="2e0zhn"
KEYID=9h0e8sjqge
APIKEY="PuChTo9Bjka6nu1NzH4yr8MgGJsSs4605HcEoEVh"
FROM="2022-04-23"
TO="2022-04-24"

curl --silent \
    "$HOST/dev/getUsage?keyId=$KEYID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO" \
    | tee usage.log

CUSTOMER_NAME="customer@test.com"
curl --silent \
    "$HOST/dev/addKey?name=$CUSTOMER_NAME&usagePlanId=$USAGE_PLAN_ID" \
    | tee addKey.log

KEYID="0tzhfvxm0c"
APIKEY="yhX3ZI9D595aGH7Cj82ar4M2uVZNuHUz14C3QuvF"
