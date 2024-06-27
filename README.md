# Contacto Backend API


This repository contains the backend API for Contacto, a fictional contact management application. The API provides endpoints for user authentication, creating, editing, and searching contacts stored in MongoDB.

## Features

- **Authentication**: Secure login using JSON Web Tokens (JWT).
- **Create Contact**: API endpoint to add new contacts securely.
- **Edit Contact**: API endpoint to update existing contact details.
- **Search Contact**: API endpoint to search contacts by name.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas Cloud)
- **Security**: Encryption (AES) for sensitive data fields
- **Deployment**: Vercel (for serverless deployment)

## Getting Started

The deployed link of the backend is https://backendapi-pi.vercel.app/  
you can test the API for the above features on the postman by using API

### 1. Login API

- **Endpoint**: `POST https://backendapi-pi.vercel.app/api/auth/login`
- **Request Body**:
  ```json
  {
      "username": "saltman",
      "password": "oai1122"
  }

### 2. Create Contact API

- **Endpoint**: `POST https://backendapi-pi.vercel.app/api/contacts/create`
- **Request Body**:
  ```json
  {
    "token": "<your_jwt_token>",
    "name": "John Doe",
    "phone": "1234567890",
    "email": "john@example.com",
    "linkedin": "john_linkedin",
    "twitter": "john_twitter"
  }

### 3. EDIT Contact API

- **Endpoint**: `PUT https://backendapi-pi.vercel.app/api/contacts/edit`
- **Request Body**:
  ```json
  {
    "token": "<your_jwt_token>",
    "name": "John Doe",
    "twitter": "new_twitter_handle"
  }

### 4. Search Contact API

- **Endpoint**: `POST https://backendapi-pi.vercel.app/api/contacts/search`
- **Request Body**:
  ```json
  {
    "token": "<your_jwt_token>",
    "search_token": "John"
  }
