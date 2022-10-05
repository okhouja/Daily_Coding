FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret!

CMD ["npm", "start"]

# when have port error : Ports are not available
# net stop winnat
# docker start container_name
# net start winnat


# docker run --name mongodb --rm -d -p 27017:27017 mongo

# docker build -t goals-node .

# docker run --name goals-backend --rm -d -p 80:80 goals-node

# docker run --name goals-backend -d --rm -p 80:80 --network goals-net goals-node:v2

# to save the data when mongodb is removed

# docker run --name mongodb -v data:/data/db --rm -d --network goals-net mongo

# to set username & password in mongodb 

# docker run --name mongodb -v data:/data/db --rm -d --network goals-net -e MONGO_INITDB_ROOT_USERNAME=alex -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

# to run the username and password in mongodb you need to create a new image and app.js use mongodb://alex:secret@mongodb:27017/course-goals?authSource=admin

# docker run --name goals-backend -v ${pwd}:/app:ro -v logs:/app/logs -v /app/node_modules -d -p 80:80 --rm --network goals-net goals-node  

# docker run --name goals-backend -v ${pwd}:/app:ro -v logs:/app/logs -v /app/node_modules  -p 80:80 --rm --network goals-net -e MONGODB_USERNAME=alex -e MONGODB_PASSWORD=secret goals-node

# docker run -v ${pwd}/src:/app/src  --name goals-frontend --rm  -it -p 3000:3000 goals-react