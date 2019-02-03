# Order

* Create an Order

## Create an Order
**Method**: `POST`  
**URL**: `/order`  
**Request body**  
Required: `email`

```json
{
	"email":"sergio.andres.reyes.lopez@gmail.com"
}
```

### Success response
**Code**: `200 OK`  
**Condition**: The order is created

### Error response
**Code**: `400 Bad Request`  
**Condition**: Required fields are missing

**Code**: `403 Forbidden`  
**Condition**: The token is not valid

**Code**: `404 Not Found`  
**Condition**: The user does not exists or the cart does not exists

**Code**: `500 Internal Error`  
**Condition**: Could not calculate the cost of the order

