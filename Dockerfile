FROM nginx:stable-alpine

COPY ./dist /www/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]