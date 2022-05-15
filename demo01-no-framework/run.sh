#1 Create policy security files
#2 Create AWS security role

aws iam create-role \
    --role-name lambda-example \
    --assume-role-policy-document file://politicas.json \
    | tee logs/role.log

#3 Create file and zip it

zip function.zip index.js

## Create aws function
aws lambda create-function \
    --function-name hello-cli \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime nodejs14.x \
    --role arn:aws:iam::111111111111:role/lambda-example
    | tee logs/lambda-create.log

#4 Invoke lambda!
aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec.log

## Update/Zip it
aws lambda update-function-code \
    --zip-file fileb://function.zip \
    --function-name hello-cli \
    --publish \
    | tee logs/lambda-update.log

aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-update-exec.log

#5 Removing
aws lambda delete-function \
    --function-name hello-cli

aws iam delete-role \
    --role-name lambda-example