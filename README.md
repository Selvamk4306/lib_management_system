# lib_management

       This is a library management  API Backend for the management iof users and books

# Routes and the Endpoints

## /users

GET - Get's all the users lists int the system
PUSH - Create/register new user

## /user/{id}

GET - Get user by id
PUT - Update user by id
DELETE - Delete user by id (if the user still has the issued books) && (penality to be collected if there)

## /users/subscription-details/{id}

GET - Get's user subscription details by their id
      >> Date if Validation
      >> Valid till ??
      >> Fine if any ??

# books
GET - Get all the books in the system
POST - Add a new book to the system

## /books{id}
GET - Get's a book by its id
PUT - Update the books by its id
DELETE - Delete the book by its id

## /books/issued
GET - all issued books

## /books/issued/withFine
GET - Get all their books with their fine amount

### Subscription types
     >> Basic (2 month)
     >> Standard (6 months)
     >> Premium (1 year)

>> if a user missed the renewal date, the should be fined with 100
>> if a user missed the subscription, then should be fined with 100
>> if both missed, then should be fined with 200

## command
npm init
npm i express 
npm i nodemon --save-dev      

to restore node_modules, packet_lock.json -> npm i/npm install

## MVC Architecture

    >> M: Model (Structure of MongoDB)
    >> V: View (Frontend)
    >> C: Controllers (Brain/Logic of a route)

## DTO (Data Transfer Object)