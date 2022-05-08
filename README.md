# MightyJaxx


API deployed url is https://mighty-jaxx-web.herokuapp.com/ . 

if api is not working for the first time, heroku is in **sleep mode** as i am using the free version. 
please try to trigger the api again.

# Available Routes

### Protected API, JWT bearer token needed 

POST `/api/products` - Create a product.

GET `/api/products/:sku` - Get a products.

GET `/api/products/` - List all products.

PUT `/api/products/:sku` - Update a product.

DELETE `/api/products/:sku` - delete product

### Public API

POST `/api/users/register` - register user

POST `/api/users/login` - login.


## How to run the project
1. `npm install --global yarn`
2. `yarn install`
3. `yarn dev`
