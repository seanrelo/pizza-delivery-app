# Users

* Register an User
* Get user information
* Update user information
* Delete an user

## Register ans User
**Method**: `POST`  
**URL**: `/user`  
**Request body**  
Required: `firstName`, `lastName`, `email`,`streetAddress`, `password`

```json
{
	"firstName":"firstName",
	"lastName": "lastName",
	"email":"email@email.com",
	"streetAddress" : "streetAddress",
	"password":"password"
}
```

### Success response
**Code**: `201 Created`  
**Condition**: The user is created in the app

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `409 Conflict`  
**Condition**: The user already exists

**Code**: `500 Internal Error`  
**Condition**: Could not create the user or the app could not hash the password



## Get user information
**Method**: `GET`  
**URL**: `/user?email=email@email.com`  
**Request header** : `token: tokenId`

### Success response
**Code**: `200 OK`  
**Condition**: The user is returned

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `403 Forbidden`  
**Condition**: The token is not valid

## Update user information
**Method**: `PT`  
**URL**: `/user`  
**Request header** : `token: tokenId`
**Request body**  
Required: `email`
Optional (at least one must be given) :  `firstName`, `lastName`,`streetAddress`, `password`

```json
{
	"firstName":"firstName",
	"lastName": "lastName",
	"email":"email@email.com",
	"streetAddress" : "streetAddress",
	"password":"password"
}
```

### Success response
**Code**: `200 OK`  
**Condition**: The user is updated

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `403 Forbidden`  
**Condition**: The token is not valid

**Code**: `409 Conflict`  
**Condition**: The user does not exists

**Code**: `500 Internal Error`  
**Condition**: Could not create update the user

## Delete an user
**Method**: `DELETE`  
**URL**: `/user?email=email@email.com`  
**Request header** : `token: tokenId`

### Success response
**Code**: `200 OK`  
**Condition**: The user was deleted

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `403 Forbidden`  
**Condition**: The token is not valid

**Code**: `409 Conflict`  
**Condition**: The user does not exists