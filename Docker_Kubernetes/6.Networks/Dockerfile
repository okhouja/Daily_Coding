FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "app.js"]


# docker run -p 3000:3000 -d --rm --name favorite-app favorite-node:v1

# run mongodb contaier / it will read mongo from docker hub
# docker run -d --name mongodb mongo 

# to connect to mongodb contaier / you need IP adress from network interface with this command
# docker container inspect mongodb