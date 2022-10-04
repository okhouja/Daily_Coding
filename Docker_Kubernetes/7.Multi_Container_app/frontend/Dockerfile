FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]


# docker build -t goals-react .

# docker run --name goals-frontend --rm -d -it -p 3000:3000 goals-react 

# docker network create goals-net 

# 
#  docker run --name goals-backend -d --rm --network goals-net goals-node

# to run react on windows with live changes
# docker run --name goals-frontend --rm -it -p 3000:3000 -e CHOKIDAR_USEPOLLING=true  goals-react