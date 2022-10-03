FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

# VOLUME ["/app/node_moudles" ]

# VOLUME [ "/temp" ]

CMD [ "npm", "start" ]

# to use it with Anonymous Volume 
# docker build -t node:volumes .
# docker run -p 3000:80 -d --rm --name feedback-app -v feedback:/app/feedback -v ${pwd}:/app:ro -v /app/temp -v /app/node_modules node:volumes