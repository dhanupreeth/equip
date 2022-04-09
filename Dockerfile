FROM node:14.17.5-alpine3.13
ENV LC_ALL=C

WORKDIR /app

COPY . ./

RUN npm install

CMD [“npm”, “start”]
