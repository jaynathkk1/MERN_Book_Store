import express from 'express'
import { Book } from '../model/bookModel.js'

const route = express.Router();

// Route for Create a new Book
route.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(500).send({ msg: 'Send all required field: title author and publishYear' });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        return res.status(500).send({ msg: error.msg });
    }
});

//Route for get all Books data from database
route.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        return res.status(500).send({ messgae: error.message });
    }
});

//Route for  get one Book data
route.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).send({ messgae: error.message });
    }
});

//Route for Edit Book Data into Database
route.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(500).send({ msg: 'Send all required field: title author and publishYear' });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ messgae: 'Book not found ' });
        }

        return res.status(200).send({ message: 'Book Updated Successfully!' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

//Route for Delete a Book data
route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ messgae: 'Book not found ' });
        }

        return res.status(200).send({ message: 'Book Deleted Successfully!' });


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default route