const express = require('express');

const bookRouter = express.Router();

const Book = require('../models/book.model');

bookRouter.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
    }
});

bookRouter.get('/:id', async (req, res) => {

    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book' });
    }
});

bookRouter.post('/', async (req, res) => {

    try {
        const { title, author } = req.body;
        const newBook = new Book({ title, author });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book' });
        console.error('Error creating book:', error);   
    }
});

bookRouter.put('/:id', async (req, res) => {

    try {
        const { title, author } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book' });
    }
});

bookRouter.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book' });
    }
});

module.exports = bookRouter;    