## build sources
FROM node:12-alpine AS builder
COPY . .

## NPMRC в хомяка тут :)

RUN mkdir storybook-static
RUN npm i
RUN npm run build
RUN npm run build:storybook

## create image
FROM nginx:alpine
COPY --from=builder /storybook-static /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
