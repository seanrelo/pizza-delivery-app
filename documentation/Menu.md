# Menu

* Get the menu


## Get the menu
**Method**: `GET`  
**URL**: `/menu`  
**Request Headers**:  
`token: <tokenId>`  

### Success response
**Code**: `200 OK`  
**Condition**: The menu is returned

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `404 Not Found`  
**Condition**: Could not get the menu

**Code**: `403 Forbidden`  
**Condition**: The token is invalid




