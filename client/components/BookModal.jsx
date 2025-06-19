import React, { useState } from 'react';
import { useAppContext } from '../context/appContext';
import axios from 'axios';

const BookModal = ({ book, comments, onClose }) => {
    if (!book) return null;
    const [text, setText] = useState('');
    const [rating, setRating] = useState('');
    const { PORT, token, user, refreshData } = useAppContext();

    async function handleAddComment() {
        if (!text || !rating) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const res = await axios.post(`${PORT}/reviews/`,
                { text, rating: parseInt(rating), userId: user.id, bookId: book._id },
                { headers: { Authorization: token } }
            );
            if (res.status !== 201) {
                return alert("Failed to add comment");
            }
            refreshData();
            setText('');
            setRating('');
            alert("Comment added");
        } catch (error) {
            console.error("Error comment:", error);
            alert("Failed to add comment");
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/55 bg-opacity-50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                    X
                </button>

                <div className="flex flex-col md:flex-row">
                    <img
                        src="./book.png"
                        alt={book.title}
                        className="w-full md:w-1/3 h-60 object-cover rounded-l-xl"
                    />
                    <div className="p-6 flex-1">
                        <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
                        <p className="text-gray-600 mb-2">by {book.author}</p>
                        <p className="text-sm text-gray-500 mb-4">
                            Book ID: <span className="font-mono">{book._id}</span>
                        </p>
                    </div>
                </div>

                <div className="border-t px-6 py-4 max-h-60 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                    <div className="flex flex-col md:flex-row items-stretch gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Rating"
                            min="1"
                            max="5"
                            className="w-20 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                            onClick={handleAddComment}
                        >
                            Add
                        </button>
                    </div>
                    {comments && comments.length > 0 ? (
                        comments.map((c, index) => (
                            <div key={index} className="border-b py-2">
                                <p className='text-sm '>⭐{c.rating}/5</p>
                                <p className="text-sm text-gray-800">{c.text}</p>
                                <p className="text-xs text-gray-500">— {c.userId.name}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 italic">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookModal;
