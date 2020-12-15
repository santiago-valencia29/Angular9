FROM node:latest as builder

COPY package.json package-lock.json ./

RUN npm install && mkdir /Angular9 && mv ./node_modules ./Angular9

WORKDIR /Angular9

COPY . .

RUN npm run ng build -- --deploy-url=/envapp/ --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /Angular9/dist /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT [ "nginx","-g","daemon off;" ]
