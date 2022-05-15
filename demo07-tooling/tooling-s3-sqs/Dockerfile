FROM lambci/lambda:build-nodejs12.x

WORKDIR /src/

COPY package.json /src/

RUN npm i

COPY . . 

CMD npm start