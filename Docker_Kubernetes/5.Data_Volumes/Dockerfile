FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 80

EXPOSE $PORT

# VOLUME ["/app/node_moudles" ]

# VOLUME [ "/temp" ]

CMD [ "npm", "start" ]

# to use it with Anonymous Volume 
# docker build -t node:volumes .
# docker run -p 3000:80 -d --rm --name feedback-app -v feedback:/app/feedback -v ${pwd}:/app:ro -v /app/temp -v /app/node_modules node:volumes

# to use environment variables

# docker run -p 3000:8000 -e PORT=8000 -d --rm --name feedback-app -v feedback:/app/feedback -v ${pwd}:/app:ro -v /app/temp -v /app/node_modules node:env

# to use environment variables .env file
# docker run -p 3000:8000 --env-file ./.env -d --rm --name feedback-app -v feedback:/app/feedback -v ${pwd}:/app:ro -v /app/temp -v /app/node_modules node:env