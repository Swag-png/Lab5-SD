const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Your routes here

let books = [];

app.get ('/whoami',(req, res) => {
    res.status(200).send({
        studentNumber: "2814833"
    })
});
app.get ('/books',(req, res) => {
    res.status(200).send(books);
});

app.get ('/books/:id',(req, res) => {
   const id = req.params.id;

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).send({
            error: "Book not found"
        });
    }

    res.status(200).send(book);
});

app.post('/books', (req, res) => {
    const {id, title, details} = req.body;
    if (!id || !title){
        return res.status(400).send({
            error: 'Missing required fields'
        });
    }
    const book = {id, title, details: details || []};
    books.push(book);
    res.status(201).send(book);
});

app.put('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index == -1){
        return res.status(404).send({
            error: "Book not found"
        });
    }
    books[index] = {...books[index], ...req.body, id: books[index].id};
    res.status(200).send(books[index]);
});

app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
   if (index == -1){
        return res.status(404).send({
            error: "Book not found"
        });
    }
    books.splice(index, 1);
    res.status(204).send();
});

app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
   if (!book){
        return res.status(404).send({
            error: "Book not found"
        });
    }
    book.details.push(req.body);
    res.status(201).send(book);
});

app.delete('/books/:id/details/:DetailId', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
   if (!book){
        return res.status(404).send({
            error: "Book or detail not found"
        });
    }
    const detailIndex = book.details.findIndex(d => d.id == req.params.detailId);
     if (detailIndex == -1){
        return res.status(404).send({
            error: "Book or detail not found"
        });
    }
    book.details.splice(detailIndex, -1);
    res.status(204).send();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

