HOST=http://localhost:3000
HOST="https://l164ndvuvf.execute-api.us-east-1.amazonaws.com"
APIKEY="d41d8cd98f00b204e9800998ecf8427e"
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
USAGE_PLAN_ID="abm7pj"
KEYID=9h0e8sjqge
APIKEY="PuChTo9Bjka6nu1NzH4yr8MgGJsSs4605HcEoEVh"
FROM="2022-04-23"
TO="2022-04-24"

curl --silent \
    "$HOST/dev/getUsage?keyId=$KEYID&usagePlanId=$USAGE_PLAN_ID&from=$FROM&to=$TO" \
    | tee usage.log