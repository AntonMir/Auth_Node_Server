# Test

1) Install NodeJS
2) Install Postgres
3) make database "auth_test"
4) git init in your directory
5) git pull https://github.com/AntonMir/Auth_Test.git
6) open ./auth_test/server and open .env, change DB_USER and DB_PASSWORD to yours

7) Go to server directory ./auth_test/server
- ###### `npm i`
- ###### `npm run dev`
###### Server URL [http://localhost:5000](http://localhost:5000)

8) Go to client directory ./auth_test/client
- ###### `npm i`
- ###### `npm run dev`
###### Client will be started on [http://localhost:3000](http://localhost:3000)

## Tokens
Access token expires in `10 seconds`
Refresh token expires in `1 hour`
