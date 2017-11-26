FROM node:6.10.3-slim
RUN apt-get update  && apt-get install -y nginx
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app
EXPOSE 80
RUN  npm install      && npm run build     && cp -r dist/* /home/app/
CMD ["nginx","-g","daemon off;"]
