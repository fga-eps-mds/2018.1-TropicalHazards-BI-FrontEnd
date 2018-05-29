FROM node:slim

RUN apt-get update && apt-get install bzip2

WORKDIR /usr/src/tropical-hazards-frontend

COPY package.json /usr/src/tropical-hazards-frontend/

COPY . /usr/src/tropical-hazards-frontend

EXPOSE 8080

CMD ["./start.sh"]
