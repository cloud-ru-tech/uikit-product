## build sources
FROM node:12-alpine AS builder
COPY . .

RUN npm config set @aicloud:registry https://nexus.devops.sbercloud.dev/repository/sbercloud-ui/

RUN mkdir storybook-static
RUN yarn && yarn build-storybook


## create image
FROM nginx:alpine
COPY --from=builder /storybook-static /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
