FROM node:10

EXPOSE 8080

WORKDIR /
COPY . /

RUN npm i
#RUN npm run build
RUN npm install http-server -g
#RUN cp /dist/* /public/
ENTRYPOINT HOST='0.0.0.0' http-server -p 8080 public/