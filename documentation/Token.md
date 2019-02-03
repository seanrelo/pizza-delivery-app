# Tokens

* Create a Token
* Delete a token


## Create a Token
**Method**: `POST`  
**URL**: `/token`  
**Request body**  
Required: `email`,`password`

```json
{
	"email":"email@email.com",
	"password":"password"
}
```

### Success response
**Code**: `201 Created`  
**Condition**: The token is created in the app

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `404 Not Found`  
**Condition**: The user does not exists

**Code**: `409 Conflict`  
**Condition**: Wrong password

**Code**: `500 Internal Error`  
**Condition**: Could not create the token or the app could not hash the password



## Delete a token
**Method**: `DELETE`  
**URL**: `/token?token=<tokenId>`  

### Success response
**Code**: `200 OK`  
**Condition**: The user is returned

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `404 Forbidden`  
**Condition**: The token does not exists
