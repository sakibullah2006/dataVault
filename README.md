## DataVault CRUD website

![swappy-20250320_193706](https://github.com/user-attachments/assets/6720632d-ed7c-4186-87e3-3685ac790768)
![swappy-20250320_193644](https://github.com/user-attachments/assets/68d0f0b7-183c-4485-84a6-9eb279985725)


# **DataVault API**
an API which keeps your secrets 
![swappy-20250320_172805](https://github.com/user-attachments/assets/0081d633-def9-44e6-a1f1-c59f8392dd93)



This API provides CRUD functionality for managing **users**, **vaults**, and **authentication**. It uses MongoDB for data storage and includes password verification for secure access to certain endpoints.

---
# Set up and run locally
### clone the repo
```bash
git clone https://github.com/sakibullah2006/dataVault.git
```
### run using npm
```bash
npm run dev
```


---
## **Base URL**

http://localhost:3000

---

## **Authentication**

- Password verification is required for **delete user** and **vault-related** endpoints.
    
- Provide `username` and `password` as query parameters for these endpoints.

---

## **Endpoints**

### **1. User Registration**

Register a new user.

- **Endpoint**: `POST /users/register`
    
- **Request Body**:
```json
    
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "1234"
    }
```
    
- **Response**:
```json
	{
      "message": "User created successfully",
      "user": {
        "_id": "user_id",
        "username": "testuser",
        "email": "test@example.com",
        "createdAt": "timestamp"
      }
    }
```

---

### **2. Get All Users**

Retrieve a list of all registered users.

- **Endpoint**: `GET /users`
    
- **Response**:
```json
	[
      {
        "_id": "user_id",
        "username": "testuser",
        "email": "test@example.com",
        "createdAt": "timestamp"
      }
    ]
```

---

### **3. Delete a User**

Delete a user and their associated data. Requires password verification.

- **Endpoint**: `DELETE /users?username=testuser&password=1234`
    
- **Response**:
```json
    {
      "message": "User deleted successfully",
      "user": {
        "_id": "user_id",
        "username": "testuser",
        "email": "test@example.com",
        "createdAt": "timestamp"
      }
    }
```

---

### **4. Create a Vault**

Create a new vault for a user. Requires password verification.

- **Endpoint**: `POST /vaults?username=testuser&password=1234`
    
- **Request Body**:
```json
	{
      "data": "This is a secret vault"
    }  
```
    
    
    
- **Response**:
```json
    {
      "message": "Vault created successfully",
      "vault": {
        "_id": "vault_id",
        "userId": "user_id",
        "data": "This is a secret vault",
        "createdAt": "timestamp"
      }
    }
```
    
    

---

### **5. Get All Vaults for a User**

Retrieve all vaults for a specific user. Requires password verification.

- **Endpoint**: `GET /vaults?username=testuser&password=1234`
    
- **Response**:
```json
	[
      {
        "_id": "vault_id",
        "userId": "user_id",
        "data": "This is a secret vault",
        "createdAt": "timestamp"
      }
    ]
```
---

### **6. Update a Vault**

Update an existing vault. Requires password verification.

- **Endpoint**: `PUT /vaults/vault_id?username=testuser&password=1234`
    
- **Request Body**:
```json
{
  "message": "Vault updated successfully",
  "vault": {
    "_id": "67dbb238fe982434f3389947",
    "userId": "67db8d98bab768d90c01a41d",
    "title": "updated title 3",
    "data": "Hello World",
    "createdAt": "2025-03-20T06:14:16.118Z",
    "updatedAt": "2025-03-20T11:02:43.507Z",
    "__v": 0
  }
} 
```
  
    
- **Response**:
```json
{
      "message": "Vault updated successfully",
      "vault": {
        "_id": "vault_id",
        "userId": "user_id",
        "data": "Updated secret vault",
        "createdAt": "timestamp"
      }
}    
```
    
    

---

### **7. Delete a Vault**

Delete an existing vault. Requires password verification.

- **Endpoint**: `DELETE /vaults/vault_id?username=testuser&password=1234`
    
- **Response**:
```json
{
      "message": "Vault deleted successfully",
      "vault": {
        "_id": "vault_id",
        "userId": "user_id",
        "data": "Updated secret vault",
        "createdAt": "timestamp"
      }
}
```

---

## **Error Responses**

All endpoints return errors in the following format:

```json
{
  "error": "Error message"
}

```

#### Common error codes:

- **400**: Bad request (missing or invalid parameters).
    
- **401**: Unauthorized (invalid password).
    
- **404**: Not found (user or vault not found).
    
- **500**: Internal server error.
    

---

## **Example Workflow**

1. **Register a User**:
```bash
curl -X POST http://localhost:3000/users/register \
    -H "Content-Type: application/json" \
    -d '{
      "username": "testuser",
      "email": "test@example.com",
      "password": "1234"
    }'**
```
    
    
2. **Create a Vault**:
```bash
   curl -X POST http://localhost:3000/vaults?username=testuser&password=1234 \
    -H "Content-Type: application/json" \
    -d '{
      "data": "This is a secret vault"
    }'	
```
3. **Get All Vaults**:
```bash
curl -X GET http://localhost:3000/vaults?username=testuser&password=1234	
```

4. **Delete a User**:
```bash
curl -X DELETE http://localhost:3000/users?username=testuser&password=1234
```
