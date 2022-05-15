
const ssmPrefix = "/prod/curso-serverless01"

const variables = {
    ECS_TASK_DEFINITION: {
        value: "process-data:2",
        type: "String"
    },
    ECS_CLUSTER_NAME: {
        value: "curso-serverless",
        type: "String"
    },
    ECS_TASK_LAUNCH_TYPE: {
        value: "FARGATE",
        type: "String"
    },
    ECS_TASK_COUNT: {
        value: "1",
        type: "String"
    },
    ECS_TASK_PLATFORM_VERSION: {
        value: "LATEST",
        type: "String"
    },
    ECS_TASK_CONTAINER_NAME: {
        value: "process-data",
        type: "String"
    },
    ECS_TASK_CONTAINER_FILE_ENV_NAME: {
        value: "SURVEY_FILE",
        type: "String"
    },
    ECS_TASK_SUBNETS: {
        value: [
            "subnet-0ec6455144cc312c5",
            "subnet-0d5609c81a10ce091",
            "subnet-0adc445c720160ebe",
            "subnet-06ea1583961641144",
            "subnet-083bdd5f0bc0ce6da",
            "subnet-010fd566ae4d7edc0"
        ]
        .join(','),
        type: "StringList"
    },
    ECS_TASK_SECURITY_GROUPS: {
        value: [
            "sg-07e6f23b02e000a52"
        ].join(','),
        type: "StringList"
    },
    ECS_TASK_ASSIGN_PUBLIC_IP: {
        value: "ENABLED",
        type: "String"
    },
    ECS_PROCESS_DATA_IMAGE_URL: {
        value: "111111111111.dkr.ecr.us-east-1.amazonaws.com/process-data",
        type: "String"
    },
    BUCKET_REPORTS: {
        value: "reports",
        type: "String"
    },
    LOG_GROUP_NAME: {
        value: "/ecs/curso-serverless01",
        type: "String"
    },
    SSM_PREFIX: {
        value: ssmPrefix,
        type: "String"
    },
    BUCKET_SURVEYS: {
        value: "surveys-beto-001",
        type: "String"
    },
    REGION: {
        value: "us-east-1",
        type: "String"
    },
    SES_EMAIL_TO: {
        value: "saturnpedrobeda@gmail.com",
        type: "String"
    },
    SES_EMAIL_FROM: {
        value: "saturnpedrobeda@gmail.com",
        type: "String"
    },
}

module.exports = {
    variables,
    ssmPrefix
}