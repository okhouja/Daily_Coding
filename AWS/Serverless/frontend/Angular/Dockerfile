# Stage 1
FROM node:8.17-jessie-slim as base

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g @angular/cli@1.2.6

COPY . .

FROM base as development

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM base as build

RUN npm run build --prod

# stage 2

FROM nginx:stable-alpine as production

COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]