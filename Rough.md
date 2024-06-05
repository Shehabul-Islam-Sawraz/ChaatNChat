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
21. To create a react app: `npx create-react-app chaatnchat`
22. To install react router: `npm i --save react-router-dom`