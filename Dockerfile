FROM node:slim

RUN apt-get update && apt-get install bzip2

RUN mkdir -p /usr/src/tropical-hazards-frontend

WORKDIR /usr/src/tropical-hazards-frontend

COPY package.json /usr/src/tropical-hazards-frontend/

RUN npm install

COPY . /usr/src/tropical-hazards-frontend

EXPOSE 8080

RUN chmod +x start.sh

CMD ["./start.sh"]
