FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]


# docker build -t goals-react .

# docker build -f frontend/Dockerfile.prod -t omar0940/goals-react  ./frontend

# docker run --name goals-frontend --rm -d -it -p 3000:3000 goals-react 

# docker network create goals-net 

# 
#  docker run --name goals-backend -d --rm --network goals-net goals-node

# to run react on windows with live changes
# docker run --name goals-frontend --rm -it -p 3000:3000 -e CHOKIDAR_USEPOLLING=true  goals-react



# multi stage build 


# FROM node:14-alpine as base
 
# WORKDIR /app
 
# COPY package.json .
 
# RUN npm install
 
# COPY . .
 
# FROM base as development
 
# EXPOSE 3000
 
# CMD [ "npm", "start" ]
 
# FROM base as build
 
# RUN npm run build
 
# FROM nginx:stable-alpine as production
 
# COPY --from=build /app/build/ /usr/share/nginx/html
 
# EXPOSE 80
 
# CMD ["nginx", "-g", "daemon off;"]