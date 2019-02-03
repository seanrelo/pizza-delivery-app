# Carts

* Create a cart
* Get a cart
* Update a cart
* Delete a cart

## Create a cart
**Method**: `POST`  
**URL**: `/cart`  
**Request body**  
Required: `email`, `items`
**Request Headers**:  
`token: <tokenId>`  

```json
{
	"email":"email@email.com",
	"items":[ {
        "pizzaId": 1,
        "name": "Neapolitan",
        "price": 10
    },
    {
        "pizzaId": 2,
        "name": "Chicago",
        "price": 11
    }]
}
```

### Success response
**Code**: `201 Created`  
**Condition**: The cart is created in the app

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `403 Forbidden`  
**Condition**: The token is invalid

**Code**: `409 Conflict`  
**Condition**: The user has already a cart

**Code**: `500 Internal Error`  
**Condition**: Could not create the user cart



## Get a cart
**Method**: `GET`  
**URL**: `/cart?email=email@email.com`  
**Request header** : `token: tokenId`

### Success response
**Code**: `200 OK`  
**Condition**: The cart is returned

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `403 Forbidden`  
**Condition**: The token is not valid

**Code**: `404 Not Found`  
**Condition**: Could not found the cart

## Update a cart
**Method**: `PUT`  
**URL**: `/cart`  
**Request header** : `token: tokenId`
**Request body**  
Required: `email`,`items`

```json
{
    "email": "sergio@gmail.com",
    "items": [
        {
	        "pizzaId": 4,
	        "name": "Greek",
	        "price": 12
    	}
    ]
}
```

### Success response
**Code**: `200 OK`  
**Condition**: The cart is updated

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `403 Forbidden`  
**Condition**: The token is not valid

**Code**: `404 Not Found`  
**Condition**: Could not found the cart


## Delete a cart
**Method**: `DELETE`  
**URL**: `/cart?email=email@email.com`  
**Request header** : `token: tokenId`

### Success response
**Code**: `200 OK`  
**Condition**: The user was deleted

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `403 Forbidden`  
**Condition**: The token is not valid

**Code**: `404 Not Found`  
**Condition**: Could not found the cart