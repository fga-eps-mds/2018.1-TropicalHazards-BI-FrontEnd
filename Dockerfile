FROM node:slim

RUN apt-get update && apt-get install bzip2

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/TropicalHazards-BI-FrontEnd && \
    cp -a /tmp/node_modules /usr/src/TropicalHazards-BI-FrontEnd

WORKDIR /usr/src/TropicalHazards-BI-FrontEnd

COPY . /usr/src/TropicalHazards-BI-FrontEnd

RUN npm run build

EXPOSE 8080

RUN chmod +x start.sh

CMD [./start.sh]
