## build sources
FROM node:12-alpine AS builder
COPY . .

RUN npm config set @sbercloud:registry https://nexus.devops.sbercloud.dev/repository/sbercloud-ui/

RUN mkdir storybook-static
RUN yarn && yarn build-storybook


## create image
## FROM nginx:alpine
## COPY --from=builder /storybook-static /usr/share/nginx/html
## COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

## RUN npx http-server storybook-static -p 80

EXPOSE 80

CMD ["npx http-server storybook-static -p 80"]
