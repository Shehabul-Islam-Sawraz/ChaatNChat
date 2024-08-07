1. Download Node.js from here [https://nodejs.org/en] and install it
2. To check installation run in CMD:
   1. node -v
   2. npm -v
3. To init project: `npm init`
4. To setup Espress serer: `npm i --save express`
5. To install nodemon: `npm i nodemon -g`
6. To install env setup: `npm i --save dotenv`
7. Download postgres from official website
8. To install sequelize: `npm i --save sequelize -g`
9. To install sequelize-cli: `npm i --save sequelize-cli -g`
10. And to save postgre: `npm i --save pg -g`
11. To init sequelize: `sequelize init`
12. To create a User model: `sequelize model:create --name User --attributes firstName:string,lastName:string,email:string,password:string,gender:string,avatar:string`
13. To make migrations: `sequelize db:migrate`
14. To create a seeder: `sequelize seed:create --name users`
15. To execute seeder: `sequelize db:seed:all`
16. To undo seeder: `sequelize db:seed:undo`
17. To install bcrypt: `npm i bcrypt`
18. To install body parser: `npm i body-parser`
19. To install JWT: `npm i jsonwebtoken`
20. For form validation: `npm i --save express-validator`
21. ------------------------------- react start
22. To create a react app: `npx create-react-app chaatnchat`
23. To install react router: `npm i --save react-router-dom`
24. Install saas: `npm i node-saas`
25. Run: `npm install postcss-loader resolve-url-loader sass-loader sass --save-dev`
26. To install axios: `npm i axios`
27. To install redux: `npm i redux` and `npm i redux-thunk` and `npm i react-redux`
28. To install reduxjs toolkit: `npm i @reduxjs/toolkit`
29. To install font awesome: `npm i --save @fortawesome/fontawesome-svg-core` , `npm install --save @fortawesome/free-solid-svg-icons`, 
`npm install --save @fortawesome/react-fontawesome`, `npm i --save @fortawesome/free-regular-svg-icons`
30. ------------------------------- react end
31. To intall Cors: `npm i cors`
32. For file upload: `npm i--save multer`
33. To create chat model: `sequelize model:create --name Chat --attributes type:string`
34. To create chatUser model: `sequelize model:create --name ChatUser --attributes chatId:integer,userId:integer`
35. To create Message model: `sequelize model:create --name Message --attributes type:string,message:text,chatId:integer,fromUserId:integer`
36. To create chat seed: `sequelize seed:create --name chats`
37. To install web socket: `npm i socket.io`