IMAGE_URL="111111111111.dkr.ecr.us-east-1.amazonaws.com/process-data"
REGION="us-east-1"
AWS_ACCOUNT_ID=111111111111

docker build -t $IMAGE_URL .

docker run $IMAGE_URL

aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

#aws ecr get-login --no-include-email --region $REGION | bash

docker push $IMAGE_URL