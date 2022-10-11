FROM node:18-alpine as base
 
WORKDIR /app
 
COPY package.json .
 
RUN npm install
 
COPY . .
 
FROM base as development
 
EXPOSE 3000
 
CMD [ "npm", "start" ]
 
FROM base as build
 
RUN npm run build
 
FROM nginx:stable-alpine as production
 
COPY --from=build /app/build/ /usr/share/nginx/html
 
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]


# to run production build
# docker build -t omar0940/goals-react --target production ./frontend


