#  Lightfeather Coding Challenge

Here is the step by step guide to run the application. There are two main folders.

- Server
- Client

### Server Folder
- It contains the back-end code
- Back-End is developed on Nodejs

#### Step by Step guide to run Back End
- Open the terminal
- Change the directory to server folder
- Install the dependencies and devDependencies and start the server.

```sh
cd server
yarn install
yarn run start:dev
```

### Client Folder
- It contains the front-end code.
- Front-End is developed on Reactjs

#### Step by Step guide to run Front End
- Open the terminal
- Change the directory to client folder
- Install the dependencies and devDependencies and start the server.

```sh
cd client
yarn install
yarn run dev
```



## Docker

#### Step by Step guide to run the dockerized app
- Install the docker
- Make sure you are using linux containers
- Open the terminal
- Change the directory to root folder
- Run the below command

```sh
docker-compose up
```

- To stop the app and remove all the containers, images and volumes
- Run the below command

```sh
docker-compose down --rmi all -v
```
