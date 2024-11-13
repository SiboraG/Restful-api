import { JSONFilePreset } from "lowdb/node";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { title } from "process";

//const_filename =fileURLToPath(import.meta.url);
//const_dirname = path.dirname(_filename);

//const path = require('path')

const defaultData = {book: [{
    id:1,
        title:"To Kill a Mockingbird",
        author:"Harper Lee",
        publisher: "Harper",
        genre: "Classic Fiction"
    }]};

    const db = await JSONFilePreset('book.json', defaultData);

    const app = express();
    app.use(express.static('public'));
  //  app.use(express.static(path.join(__dirname, 'public')));

  //app.use('/public', express.static(path.join(__dirname, 'public')))
    app.use(express.json());


    function newId() {
        return db.data.book.length > 0
        ? Math.max(...db.data.book.map(book => book.id)) +1
        :1;
    }

    //app.get('/', (req, res) => {
    //    res.sendFile(path.join(__dirname, 'public','table.html'));
    //});

    // GET /books- read all books
    app.get('/book', async (req, res) => {
        await db.read();
        res.json(db.data.book);
    });

    // GET /book/:id - read a single book by id
    app.get('/book/:id', async (req, res) => {
        await db.read();
        const book = db.data.book.find(book => book.id === parseInt(req.params.id));
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({error:'Book not found'});
        }
    });

    // POST /book - create a new book
    app.post('/book', async (req, res) => {
        await db.read();
        const newBook = {...req.body, id: newId()};
        db.data.book.push(newBook);
        await db.write();
        res.status(201).json(newBook);
    });

    // PUT /book/:id - update a book by id
    app.put('/book/:id', async (req, res) => {
        await db.read();
        const book = db.data.book.find(book => book.id === parseInt(req.params.id));
        if (book) {
            Object.assign(book,req.body);
            await db.write();
            res.json(book);
        }
        else {
            res.status(404).json({error:'Book not found'});
        }
    });

    // DELETE /book/:id - delete a book by id
    app.delete('/book/:id', async (req, res) => {
        await db.read();
        const bookIndex = db.data.book.findIndex(book => book.id === parseInt(req.params.id));
        if (bookIndex > -1) {
            db.data.book.splice(bookIndex, 1);
            await db.write();
            res.status(204).send();
        }
        else {
            res.status(404).json({error:'Book not found'});
        }
    });
    
    app.listen(5500, () => {
        console.log(`Server running at http://localhost:5500/${title}`);
    });


