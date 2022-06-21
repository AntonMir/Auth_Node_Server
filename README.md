# Test

1) Install NodeJS
2) Install Postgres
3) make database "auth_test"
4) git init in your directory
5) git pull https://github.com/AntonMir/Auth_Node_Server.git
6) open ./auth_node_server and open .env, change DB_USER and DB_PASSWORD to yours

7) Go to server directory ./auth_node_server
- ###### `npm i`
- ###### `npm run dev`
###### Server URL [http://localhost:5000](http://localhost:5000)

## Tokens
Access token expires in `10 seconds`
Refresh token expires in `1 hour`

## Endpoints
###### /auth/signup :  ```body: {email: 'email@email.com', name: 'Jhon', password: '*******'}```

###### /auth/login :  ```body: {email: 'email@email.com', password: '*******'}```

###### /auth/refresh :  ```body: {refreshToken: 'token...'} header: Authorization: Bearer <access token>```
