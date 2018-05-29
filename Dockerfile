FROM node:slim

RUN apt-get update && apt-get install bzip2

WORKDIR /tropical-hazards-frontend

COPY package.json /tropical-hazards-frontend/

COPY . /tropical-hazards-frontend

EXPOSE 8080

CMD ["./start.sh"]
