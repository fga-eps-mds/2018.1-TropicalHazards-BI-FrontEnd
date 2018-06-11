# Tropical Hazards BI

![](https://i.imgur.com/OhSvJLM.jpg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a715ea21d0564479880d48f3eadd21af)](https://app.codacy.com/app/andre-filho/2018.1-TropicalHazards-BI-FrontEnd?utm_source=github.com&utm_medium=referral&utm_content=fga-gpp-mds/2018.1-TropicalHazards-BI-FrontEnd&utm_campaign=badger)
[![Build Status](https://travis-ci.org/fga-gpp-mds/2018.1-TropicalHazards-BI-FrontEnd.svg?branch=master)](https://travis-ci.org/fga-gpp-mds/2018.1-TropicalHazards-BI-FrontEnd)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Sobre

<p align="justify"> O Tropical Hazards Business Intelligence é um sistema cujo a finalidade é auxiliar os pesquisadores e profissionais de saúde do Núcleo de Medicina Tropical da UnB, permitindo o gerenciamento e compartilhamento de dados e indicadores referentes às doenças tropicais. O sistema foi projetado de modo a permitir que os profissionais possam fazer análises estatísticas, compartilhar informações gerenciadas em dashboards e disponibilizar esses dados para o público.</p>

## Deploy
[Homolog](http://159.203.102.150)

## Documentação

  Se você quiser saber como utilizar o sistema ou como o mesmo foi projetado, a [documentação](https://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI/tree/master/docs) do projeto pode ser encontrada no link em destaque ou pode ser acessada através do [github pages](https://fga-gpp-mds.github.io/2018.1-TropicalHazards-BI) do projeto. Para contribuir com o projeto solicitamos que acesse o nosso workflow de repositório com a [política de branches](https://fga-gpp-mds.github.io/2018.1-TropicalHazards-BI/workflow/politica_de_branches), [política de commits](https://fga-gpp-mds.github.io/2018.1-TropicalHazards-BI/workflow/politica_de_commit) e [issue workflow](https://fga-gpp-mds.github.io/2018.1-TropicalHazards-BI/workflow/issue_workflow).

## Repositórios
  Foram criados dois repositórios para o desenvolvimento do sistema, divididos em [back-end](https://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI) e [front-end](https://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI-FrontEnd). No segundo repositório estão as dependências e configurações para o ambiente de desenvolvimento com vue.js . O repositório atual é dedicado ao back-end, assim como a documentação do sistema.

## Instalação

#### 1- Garanta que os seguintes programas ja estão instalados em seu computador
[docker](https://docs.docker.com/install/) e [docker-compose](https://docs.docker.com/compose/install/#install-compose)

#### 2 - Garanta que o _network_ "20181tropicalhazardsbi_default" ja exista usando o comando:
``` bash
$ docker network ls 
```
  ##### 2.1 - Caso o _network_ "20181tropicalhazardsbi_default" não apareça nessa lista siga o tutorial para instalar o [back-end](https://github.com/fga-gpp-mds/2018.1-TropicalHazards-BI)

#### 3 - Suba o serviço usando o comando:
``` bash
$ docker-compose up
```

#### 4 - O seu serviço estara rodando em "http://localhost:8080"
