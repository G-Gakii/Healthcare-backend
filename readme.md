# Healthcare Provider Locator API Backend

## Overview

This project focuses on the backend development of a platform that enables users to locate healthcare providers based on location and specialization. It also aims to improve cost transparency, simplify appointment booking, and promote accountability and quality of care through feedback and ratings.

## Goals

- Enable users to locate healthcare providers based on location and specialization.
- Improve cost transparency by displaying consultation fees and accepted insurance plans.
- Simplify appointment booking with an intuitive scheduling system .
- Promote accountability and quality of care through a feedback and ratings system.

## Features

### Location and Specialization

- Search for healthcare providers based on geographical location.
- Filter providers by specialization.

### Cost Transparency

- Display consultation fees.
- Show accepted insurance plans.

### Appointment Booking

- Intuitive scheduling system for booking appointments.
- Reminders for upcoming appointments.

### Feedback and Ratings

- System for users to provide feedback and rate providers.
- Ensure accountability and improve quality of care.

## API Endpoints

-Base Url:`https://accessablehealthcare.onrender.com`

### User Authentication Endpoints

- Method:`POST`
- Endpoint : `/api/ach/login`
- User authentication.
- Request body

  ```
  {
    "email":"fuu@example.com",
    "password":"Fuu12345"
  }
  ```

- Success Response:
  - Code: `200 OK`
  - Content:

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWNlODBjNmMyNTE2NzQ3YTI1MmQ1MiIsImlhdCI6MTczODQzNDk5MCwiZXhwIjoxNzM4NDM4NTkwfQ.FMKnti3zkSX-eNKtm4a3W4OAoyvcnujmeZpawOFVmpE",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWNlODBjNmMyNTE2NzQ3YTI1MmQ1MiIsImlhdCI6MTczODQzNDk5MCwiZXhwIjoxNzM4NDM4NTkwfQ.FMKnti3zkSX-eNKtm4a3W4OAoyvcnujmeZpawOFVmpE"
}
```

- Method:`POST`
- Endpoint : `api/ach/register`
- User registration.
- Request body

  ```
  {
    "username":"fuu",
    "email":"fuu@example.com",
    "role":"admin", :`can only be "admin or "user"`
    "password":"Fuu12345"
  }
  ```

- Success Response:
  - Code: `200 OK`
  - Content:

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWNlODBjNmMyNTE2NzQ3YTI1MmQ1MiIsImlhdCI6MTczODQzNDk5MCwiZXhwIjoxNzM4NDM4NTkwfQ.FMKnti3zkSX-eNKtm4a3W4OAoyvcnujmeZpawOFVmpE",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWNlODBjNmMyNTE2NzQ3YTI1MmQ1MiIsImlhdCI6MTczODQzNDk5MCwiZXhwIjoxNzM4NDM4NTkwfQ.FMKnti3zkSX-eNKtm4a3W4OAoyvcnujmeZpawOFVmpE"
}
```

- Method:`POST`
- Endpoint : `api/ach/logout`
- Logout User
- Headers:
  - Authorization: `Bearer <token>`
- Success Response:
  - Code: `200 OK`
  - Content:

```
{
  "message": "Logged out successfully"
}
```

### Provider Endpoints

- Method:`GET`
- Endpoint : ` /api/ach/providers`
- Get a list of providers.
- Success Response:
  - Code: `200 OK`
  - Content:

```

{
"providers": [
{
"location": {
"type": "Point",
"coordinates": [
-1.31047,
36.80482
]
},
"\_id": "679d23fa58b037d16cbf8569",
"name": "MRH",
"specialization": [
"Psychiatry",
"General",
"MCH"
],
"consultation_fee": 1000,
"insurance": [
"APA",
"Equity",
"NHIF"
],
"rating": 0,
"**v": 0,
"rate": 4,
"reviews": [
{
"\_id": "679dc03ccfebcf956ba6b3ba",
"provider": "679d23fa58b037d16cbf8569",
"user": "679ce5b2974a778afd827a86",
"rating": 4,
"comment": "average services",
"createdAt": "2025-02-01T06:33:32.745Z",
"updatedAt": "2025-02-01T06:33:32.745Z",
"**v": 0
}
],
"id": "679d23fa58b037d16cbf8569"
},

]
}

```

- Method:`POST`
- Endpoint : `/api/ach/providers`
- Add a list of providers.
- Authentication: Only admins can access this endpoint. The request must include a valid Bearer token with admin role permissions.
- Headers:
  - Authorization: `Bearer <token>`
- Request body

```

[
{

"name": "TRH",
"email":"trh@gmail.com",
"location": {
"type": "Point",
"coordinates": [0.0583, 36.6542]
},

"specialization": ["Psychiatry","General","MCH"],
"consultation_fee": 1000,
"insurance": ["APA","Equity","NHIF"]

}

]

```

- Success Response:
  - Code: `201 OK`
  - Content:

```

{
"message": "providers added successfully",
"providers": [
{
"name": "ZRH",
"email": "zrh@gmail.com",
"location": {
"type": "Point",
"coordinates": [
0.0593,
36.6442
]
},
"specialization": [
"General",
"MCH"
],
"consultation_fee": 1000,
"insurance": [
"APA",
"NHIF"
],
"\_id": "679e651291ef05f2b3f4b6e8",
"\_\_v": 0,
"id": "679e651291ef05f2b3f4b6e8"
}
]
}

```

- Method:`GET`
- Endpoint : `api/ach/providers/nearest`
- Search for providers based on location and specialization.
- Request body:

```

{
"latitude":37.6559,
"longitude":0.0463,
"specialization":"Optical"
}

```

- Success Response:

  - Code: `200 OK`
  - Content:

```

[
{
"location": {
"type": "Point",
"coordinates": [
0.0463,
37.6559
]
},
"\_id": "679d25f458b037d16cbf8578",
"name": "FRH",
"specialization": [
"Optical"
],
"consultation_fee": 5000,
"insurance": [
"BPA",
"Equity"
],
"rating": 0,
"\_\_v": 0,
"id": "679d25f458b037d16cbf8578"
}
]

```

- Method:`PUT`
- Endpoint : `api/ach/providers/:id`
- Update a provider.
- - Authentication: Only admins can access this endpoint. The request must include a valid Bearer token with admin role permissions.
- Headers:
  - Authorization: `Bearer <token>`
- Request body

```

{

"name": "MRH",
"email":"mrh@gmail.com",
"location": {
"type": "Point",
"coordinates": [0.0483, 37.6542]
},
"specialization": ["Psychiatry","General","MCH"],
"consultation_fee": 1000,
"insurance": ["APA","Equity","NHIF"]
}

```

- Success Response:
  - Code: 200 OK
  - Content:

```

{
"message": "updated successfully",
"myProvider": {
"location": {
"type": "Point",
"coordinates": [
-1.31047,
36.80482
]
},
"\_id": "679d23fa58b037d16cbf8569",
"name": "MRH",
"specialization": [
"Psychiatry",
"General",
"MCH"
],
"consultation_fee": 1000,
"insurance": [
"APA",
"Equity",
"NHIF"
],
"rating": 0,
"\_\_v": 0,
"rate": 4,
"id": "679d23fa58b037d16cbf8569"
}
}

```

- `DELETE api/ach/providers/:id`:Delete a provider.

- Method:`DELETE`
- Endpoint : `api/ach/providers/:id`
- Delete a provider.
- Authentication: Only admins can access this endpoint. The request must include a valid Bearer token with admin role permissions.
- Headers:

- Authorization: `Bearer <token>`

- Success Response:
  - Code: `200 OK`
  - Content:

```
{
"message": "Provider deleted successfully"
}

```

### Appointment Endpoints

- Method:`POST`
- Endpoint : `api/ach/appointmen`
- Schedule an appointment.
- Authentication: Requires a valid Bearer token in the Authorization header.
- Headers:
  - Authorization: `Bearer <token>`
- Request body:

  ```
  {
    "provider":"679c8424a8e0f764f1e303ab",

    "date":"2025-03-20T11:00:00Z"
  }
  ```

- Success Response:

  - Code: 200 OK
  - Content:

```
{
    "provider": "679c8424a8e0f764f1e303ab",
    "user": "679cd2b75dd8dfed10395456",
    "date": "2025-03-20T11:00:00.000Z",
    "_id": "679e6d8591ef05f2b3f4b6ff",
    "createdAt": "2025-02-01T18:52:53.595Z",
    "updatedAt": "2025-02-01T18:52:53.595Z",
    "__v": 0
}
```

- Method:`GET`
- Endpoint : `api/ach/appointment`
- Get All appointment details.
- Authentication: Only admins can access this endpoint. The request must include a valid Bearer token with admin role permissions.
- Headers:
  - Authorization: `Bearer <token>`
- Success Response:

  - Code: 200 OK
  - Content:

  ```
  [
    {
        "_id": "679e6d8591ef05f2b3f4b6ff",
        "provider": "679c8424a8e0f764f1e303ab",
        "user": "679cd2b75dd8dfed10395456",
        "date": "2025-03-20T11:00:00.000Z",
        "createdAt": "2025-02-01T18:52:53.595Z",
        "updatedAt": "2025-02-01T18:52:53.595Z",
        "__v": 0
    }
  ]
  ```

  - Method:`GET`

- Endpoint : `api/ach/appointment/:id`
- Get Users appointment details.
- Authentication: Only admins or owner can access this endpoint. The request must include a valid Bearer token with admin role permissions or owner.
- Headers:
  - Authorization: `Bearer <token>`
- Success Response:

  - Code: 200 OK
  - Content:

  ```
  [
    {
        "_id": "679e6d8591ef05f2b3f4b6ff",
        "provider": "679c8424a8e0f764f1e303ab",
        "user": "679cd2b75dd8dfed10395456",
        "date": "2025-03-20T11:00:00.000Z",
        "createdAt": "2025-02-01T18:52:53.595Z",
        "updatedAt": "2025-02-01T18:52:53.595Z",
        "__v": 0
    }
  ]
  ```

- `PUT api/ach/appointment/:id`: Update an appointment.
- Method:`PUT`
- Endpoint : `api/ach/appointment/:id`
- Update an appointment.
- Authentication: Only admins or owner can access this endpoint. The request must include a valid Bearer token with admin role permissions or owner.
- Headers:
  - Authorization: `Bearer <token>`
- Request body:

  ```
  {
    "provider":"679c8424a8e0f764f1e303ab",
    "date":"2025-03-20T11:00:00Z"
  }
  ```

- Success Response:
  - Code: `200 OK`
  - Content:

```
{
    "provider": "679c8424a8e0f764f1e303ab",
    "user": "679cd2b75dd8dfed10395456",
    "date": "2025-03-20T11:00:00.000Z",
    "_id": "679e6d8591ef05f2b3f4b6ff",
    "createdAt": "2025-02-01T18:52:53.595Z",
    "updatedAt": "2025-02-01T18:52:53.595Z",
    "__v": 0
}
```

- `DELETE api/ach/appointment/:id`:
- - Method:`DELETE`
- Endpoint : `api/ach/appointment/:id`
- Cancel an appointment.
- Authentication: Only admins or owner can access this endpoint. The request must include a valid Bearer token with admin role permissions or owner.
- Headers:

- Authorization: `Bearer <token>`

- Success Response:
  - Code: `200 OK`
  - Content:

```
{
"message": "Appointment deleted successfully"
}

```

### Feedback Endpoints

- - Method:`POST`
- Endpoint : `api/ach/review/`
- Submit feedback.
- Authentication: Only user can access this endpoint. The request must include a valid Bearer token with user role permissions
- Headers:
  - Authorization: `Bearer <token>`
- Request body:

  ```
  {

    "provider":"679d23fa58b037d16cbf8569",

    "rating":4,
    "comment":"Good"
  }
  ```

- Success Response:
  - Code: `200 OK`
  - Content:

```
{
    "message": "updated successfully ",
    "review": {
        "_id": "679dc03ccfebcf956ba6b3ba",
        "provider": "679d23fa58b037d16cbf8569",
        "user": "679ce5b2974a778afd827a86",
        "rating": 4: `Rating should be between 1 and 5`
        "comment": "average services",
        "createdAt": "2025-02-01T06:33:32.745Z",
        "updatedAt": "2025-02-01T06:33:32.745Z",
        "__v": 0
    }
}

```

- Method:`PUT`
- Endpoint : `api/ach/review/:id`
- Edit health care provider reviews.
- Authentication: Only admins or owner can access this endpoint. The request must include a valid Bearer token with admin role permissions or owner.
- Headers:
  - Authorization: `Bearer <token>`
- Request body:

  ```
  {

    "provider":"679d23fa58b037d16cbf8569",

    "rating":4,
    "comment":"Good"
  }
  ```

- Success Response:
  - Code: `200 OK`
  - Content:

```
{
    "message": "updated successfully ",
    "review": {
        "_id": "679dc03ccfebcf956ba6b3ba",
        "provider": "679d23fa58b037d16cbf8569",
        "user": "679ce5b2974a778afd827a86",
        "rating": 4,
        "comment": "average services",
        "createdAt": "2025-02-01T06:33:32.745Z",
        "updatedAt": "2025-02-01T06:33:32.745Z",
        "__v": 0
    }
}

```

- Method:`DELETE`
- Endpoint : `api/ach/review/:id`
- DELETE health care provider reviews.
- Authentication: Only admins or owner can access this endpoint. The request must include a valid Bearer token with admin role permissions or owner.
- Headers:

- Authorization: `Bearer <token>`

- Success Response:
  - Code: `200 OK`
  - Content:

```

{
"message": review deleted successfully
}

```

## Installation

To set up the project locally, follow these steps:

1.  Clone the repository:

```
git clone https://github.com/G-Gakii/accessableHealthcare
cd accessableHealthcare
```

2.  Install the dependencies:

```
npm install
```

3.  Set up the environment variables:
    Create a `.env` file in the root directory and add the required environment variables. For example:

```
- DB_URL=your_database_url
- PORT=3000 # Or your preferred port
- ACCESS_TOKEN=your_access_token_secret
- REFRESH_ToKEN=your_refresh_token_secret

```

4.  Start the development server:

```
npm start

```
