# Reeled-Inn-Movie-App

## Introduction

Hello, I am the developer of Reeled-Inn-Movie-App. This is a basic Express application that makes a CRUD operation using SQLite database. In this project, I built a Movie Listing Application that allows users to view and manage their Movies. The application includes an authentication and authorization system to ensure that only authorized users can perform CRUD operations.

## Requirements

This project required that I implement an authorization and authentication system that protects all routes. Only logged-in users can perform the following operations:

1. Add a Movie.
2. Edit a Movie.
3. Delete a Movie.

Note that users that are not authenticated can browse through Movies on the app.

## Implementation

To complete this project, I have created an application that performs the following:

1. A GET request that returns all the data in the database.
2. A POST request that adds data to the database.
3. A PUT request that updates fields of a particular data using the ID in the database.
4. A DELETE request that removes a particular data from the database using the ID.

The data format example for users and the Movies added/created by the user are shown below:
```
[

 {
   fullname: 'john doe',
   username:'Yourusername'
   email: 'john@example.com', // no duplicates allowed.
   password:"ofyourchoice",
 }
 
   Movies:[
   {
    title: 'Avengers',
    description :'Avengers is an interesting movie'
    image:"https://mycourseimge.com",
    price: 3000
    id:"databaseId1"
   },
     {
    title: 'God's must be crazy',
    description :'You know it's God's not God, because he cant be.'
    image:"https://mymovieimage.com",
    price: 8000
    id:"databaseId2"
   }
   ......
]

```
I used input validation to ensure that users follow this format when creating movies.

I have also implemented a frontend that includes the following:

A page to display all Movie Listings (title, image, description, and price should display).
An admin/dashboard area to add, edit, and delete Movies (users can only edit and delete Movies created by them).
A Login Page and Sign Up Page.

Finally, I have written tests to cover the application using Jest/supertest. The tests cover the following:

1. A test for a GET request.
2. A test for a POST request.
3. A test for a PUT request.
4. A test for a DELETE request.
5. A test to return proper HTTP status codes.

## Hosting

This application is live on Render: https://reeledinn.onrender.com/
