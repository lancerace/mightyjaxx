# MightyJaxx


API deployed url is https://mighty-jaxx-web.herokuapp.com/ . 

image is uploaded to s3 bucket. returning with s3 presigned url to generate image frontend.

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
