Lab 5: Building RESTful APIs with Node.js
Objective

In this lab, you will learn to build a RESTful API using Node.js and Express.js. You will create an API to manage a collection of books and their details, following REST conventions and best practices.
Learning Outcomes

By the end of this lab, you will be able to:

    Set up a Node.js project with Express.js
    Design and implement RESTful API endpoints
    Handle different HTTP methods (GET, POST, PUT, DELETE)
    Use appropriate HTTP status codes
    Implement error handling
    Work with JSON request/response bodies

Time Estimate

2.5 hours
Prerequisites

    Node.js installed (v18+)
    Completed Labs 1-4

Requirements
Part 1: Project Setup

    Create your API file
        Create a single file named exactly: <student-id>-lab5.js
        Example: 2345678-lab5.js

    Install Express

    npm init -y
    npm install express

    Basic Structure

    const express = require('express');
    const app = express();
    const PORT = 3000;

    app.use(express.json());

    // Your routes here

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

Part 2: Data Structure

Store books in an in-memory array (must start empty):

let books = [];

Each book has this structure:

{
    "id": "1",
    "title": "To Kill a Mockingbird",
    "details": [
        {
            "id": "1",
            "author": "Harper Lee",
            "genre": "Fiction",
            "publicationYear": 1960
        }
    ]
}

Note:

    id and title are required
    details is an array that can contain multiple detail objects
    Each detail has: id, author, genre, publicationYear

Part 3: API Endpoints

Implement the following endpoints:
Method 	Endpoint 	Description 	Success 	Error
GET 	/whoami 	Returns your student number 	200 	-
GET 	/books 	Returns all books 	200 	-
GET 	/books/:id 	Returns specific book 	200 	404
POST 	/books 	Creates a new book 	201 	400
PUT 	/books/:id 	Updates a book 	200 	404
DELETE 	/books/:id 	Deletes a book 	200/204 	404
POST 	/books/:id/details 	Adds detail to book 	201 	404
DELETE 	/books/:id/details/:detailId 	Removes detail 	200/204 	404
Part 4: Endpoint Specifications
GET /whoami

Returns an object with your student number.

Response (200 OK):

{
    "studentNumber": "2345678"
}

GET /books

Returns all books in the collection.

Response (200 OK):

[
    {
        "id": "1",
        "title": "1984",
        "details": [...]
    }
]

When empty:

[]

GET /books/:id

Returns a specific book by ID.

Response (200 OK):

{
    "id": "1",
    "title": "1984",
    "details": [...]
}

Response (404 Not Found):

{
    "error": "Book not found"
}

POST /books

Creates a new book.

Request body:

{
    "id": "1",
    "title": "1984",
    "details": [
        {
            "id": "1",
            "author": "George Orwell",
            "genre": "Dystopian",
            "publicationYear": 1949
        }
    ]
}

Response (201 Created): Returns the created book.

Response (400 Bad Request):

{
    "error": "Missing required fields"
}

Required fields: id, title
PUT /books/:id

Updates an existing book.

Request body:

{
    "title": "Updated Title"
}

Response (200 OK): Returns the updated book.

Response (404 Not Found):

{
    "error": "Book not found"
}

DELETE /books/:id

Deletes a book from the collection.

Response (200 OK or 204 No Content)

Response (404 Not Found):

{
    "error": "Book not found"
}

POST /books/:id/details

Adds a detail to a book's details array.

Request body:

{
    "id": "2",
    "author": "Another Author",
    "genre": "Mystery",
    "publicationYear": 2020
}

Response (201 Created): Returns the updated book.

Response (404 Not Found):

{
    "error": "Book not found"
}

DELETE /books/:id/details/:detailId

Removes a specific detail from a book.

Response (200 OK or 204 No Content)

Response (404 Not Found):

{
    "error": "Book or detail not found"
}

Part 5: Error Handling

    Return 404 Not Found when a book/detail doesn't exist
    Return 400 Bad Request when POST/PUT has missing required fields
    Always return JSON responses
    Set correct Content-Type: application/json headers

Submission
Deliverables

    Single JavaScript file named exactly: <student-id>-lab5.js
    Submit to Moodle
    Push to your GitHub repository

Requirements

    All code must be in the single file (no imports from other local files)
    Must run on port 3000
    Must use Express.js
    Data stored in-memory (no database)

Example Submission

2345678-lab5.js

Evaluation Criteria

Your API will be automatically tested:
Test 	Points
Server starts on port 3000 	5
GET /whoami returns studentNumber 	10
GET /books returns empty array initially 	8
POST /books creates book (returns 201) 	12
GET /books/:id returns created book 	8
GET /books/:id returns 404 for non-existent 	8
PUT /books/:id updates book 	8
DELETE /books/:id removes book 	8
POST /books with missing fields returns 400 	10
POST /books/:id/details adds detail 	8
DELETE /books/:id/details/:detailId removes detail 	8
Response headers include application/json 	7
Total 	100
Testing Your API
Using cURL

# GET /whoami
curl http://localhost:3000/whoami

# GET /books
curl http://localhost:3000/books

# POST /books
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"id":"1","title":"Test Book","details":[]}'

# GET /books/1
curl http://localhost:3000/books/1

# PUT /books/1
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# DELETE /books/1
curl -X DELETE http://localhost:3000/books/1

Using Postman

    Create a new collection for Lab 5
    Add requests for each endpoint
    Test all success and error scenarios

Important Notes

    File name must be EXACTLY as specified
    Port must be 3000 (or the tests won't run)
    Start with an empty books array
    Your student number in /whoami must match your submission filename
    Do not use a database - use in-memory storage only
    All code in a single file (no imports from local files)

Tips for Success

    Test each endpoint as you build it
    Check status codes - they matter for marking
    Validate request bodies before processing
    Use console.log to debug requests
    Restart your server after code changes

Good luck!
