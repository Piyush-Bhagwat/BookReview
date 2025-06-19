const reviewRouter = require('express').Router();
const Review = require('../models/review.model');

reviewRouter.get('/book/:BookId', async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.BookId }).populate('userId', 'name email');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});

reviewRouter.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('userId', 'name email');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching review' });
    }
});

reviewRouter.post('/', async (req, res) => {

    try {
        const { bookId, userId, rating, text } = req.body;
        const newReview = new Review({ bookId, userId, rating, text });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review' });
    }
});

reviewRouter.delete('/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review' });
    }
});

module.exports = reviewRouter;