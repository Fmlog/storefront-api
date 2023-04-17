# STOREFRONT_API
An API for a [store website](https://github.com/Fmlog/angular-storeproject).  
Users are able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.
It is built with the following:
* Postgres for the database
* Node/Express for the application logic.  

## DATABASE SETUP
* Login to postgres user on your terminal:
> `sudo -u postgres psql`

* Create  `full_stack_user` using the command below:
> `CREATE USER full_stack_user WITH PASSWORD 'password123' SUPERUSER;`

* Create `storefront` database in psql with user. This is the development database.
> `CREATE DATABASE storefront;`  
> `GRANT ALL PRIVILEGES ON DATABASE storefront TO full_stack_user;`

* Create `storefront-test` database in psql with the user above. This is the testing database.

## ENVIRONMENT SETUP
Create a .env file with the following
```
POSTGRES_DB=storefront  
POSTGRES_HOST=127.0.0.1  
POSTGRES_USER=full_stack_user  
POSTGRES_PASSWORD=password123  
ENV=dev  
BCRYPT_PASSWORD=AxsdZXuw503Rsa  
SALT_ROUND=10  
TOKEN_SECRET=Bscw12jiKZ  
TEST_TOKEN=test  
```
The application runs on the default port `5432`

## DEPENDENCY INSTALL
* Run `npm install` on your terminal to install the dependecies. 

## MIGRATIONS
* Run `db-migrate --env dev up` to migrate the tables to the created database.

## COMPILATION AND RUNNING
* Run `npm start` to start the application (build version)
* Run `npm watch` to start the application (transpiled version)
    
## TESTING
* Run `npm test` to run all the tests.

