FROM nginx
RUN mkdir /flink_web
COPY ./dist /flink_web
COPY nginx.conf /etc/nginx/nginx.conf