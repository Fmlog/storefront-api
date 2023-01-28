# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products' [GET]
- Show '/product/:id' [GET]
- Create [token required] '/products' [POST]
- [OPTIONAL] Top 5 most popular products '/products/top-5' [GET]
- [OPTIONAL] Products by category (args: product category) '/products/:category' [GET]

#### Users
- Index[token required] '/users' [GET]
- Show [token required] '/user/:id' [GET]
- Create New user[token required] '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id: SERIAL PRIMARY KEY
- name: VARCHAR(64)
- price: INTEGER
- [OPTIONAL] category: VARCHAR(64)

#### User
- id: SERIAL PRIMARY KEY
- firstName: VARCHAR(64)
- lastName: VARCHAR(64)
- password: VARCHAR(64)

#### Orders
- id: SERIAL PRIMARY KEY
- id of each product in the order : INTEGER 
- quantity of each product in the order INTEGER
- user_id: INTEGER [foreign key to users table]
- status of order (active or complete): VARCHAR(64) 

