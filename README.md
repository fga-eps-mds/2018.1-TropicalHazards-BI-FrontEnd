# tropical-hazards-bi-front-end

> front-end for Tropical Hazards BI

## Build Setup


#### 1- Garanta que os seguintes programas ja estão instalados em seu computador
[docker](https://docs.docker.com/install/) e [docker-compose](https://docs.docker.com/compose/install/#install-compose)

#### 2 - Garanta que o _network_ "20181tropicalhazardsbi_default" ja exista usando o comando:
``` bash
$ 20181tropicalhazardsbi_default
```
#### 2.1 - Caso o _network_ "20181tropicalhazardsbi_default" não apareça nessa lista siga o tutorial para instalar o [back-end](https://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI)

#### 3 - Rode o npm install dentro do container utilizando o comando:
``` bash
$ docker-compose up
```
#### 3.1 - Derrube o serviço precionando "ctrl+c"

#### 4 - Altere a linha 211 do arquivo "node_modules/webpack-dev-server/bin/webpack-dev-server.js" para:
``` bash
default: '0.0.0.0',
```
#### 5 - Suba o serviço usando o comando:
``` bash
$ docker-compose up
```

#### 6 - O seu serviço estara rodando em "http://localhost:8080"
