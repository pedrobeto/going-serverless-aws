# URL=https://4x3cknd304.execute-api.us-east-1.amazonaws.com/graphql
URL=http://localhost:4002/graphql
curl $URL \
-H 'Content-Type: application/json' \
--data-binary '{"query":"# Write your query or mutation here\n{\n getSkill, getHero\n}"}' --compressed