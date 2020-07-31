
va para a pasta /pdv/backend
e rode os comandos a baixo.

    ~ sudo docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

    ~ npm i ou yarn

    ~ adonis serve --dev

abra outro terminal 
continue na pasta /pdv/backend 

    ~ adonis migration:run

    ~ adonis seed 


agora va para a pasta /pdv/frontend 
e rode os comandos a baixo

    ~ npm i  
ou 
    ~ yarn 
ou 
    ~ sudo npm i

apos isso rode o start 

    ~ npm start 
ou
    ~ yarn start

Pronto o sistema ja esta no ar
a baixo se encontra os dados de login.

email: teste@teste.com
password: 123456
