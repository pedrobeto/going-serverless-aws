#1 Install it
yarn add -g serverless

#2 Start it
sls

#3 Always do env deploy before all to check if your env is ok!
sls deploy

#4 Invoke it
sls invoke -f hello

sls invoke local -f hello --log

#5 Config dashboard
sls

#Logs
sls logs -f hello --tail

#Remove
sls remove