FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["node", "app.js"]

# when have port error : Ports are not available
# net stop winnat
# docker start container_name
# net start winnat


# docker run --name mongodb --rm -d -p 27017:27017 mongo

# docker build -t goals-node .

# docker run --name goals-backend --rm goals-node
