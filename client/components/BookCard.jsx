import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext';
import BookModal from './BookModal';
import axios from 'axios';
import { getAvgRating, getCommentCount } from '../utils/comments';

const BookCard = ({ book }) => {
    const { PORT, token, refresh } = useAppContext();
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useState(false);

    async function fetchComments() {
        try {

            const res = await axios.get(`${PORT}/reviews/book/${book._id}`, { Headers: { Authorization: token } });
            if (res.status === 200) {
                setComments(res.data);
            } else {
                console.error("Failed to fetch comments");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchComments();
        }
    }, [token, refresh]);

    const avg = getAvgRating(comments);
    const count = getCommentCount(comments);

    return (
        <>
            <div
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => setOpen(true)}
            >
                <img
                    src="./book.png"
                    alt={book.title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                    <p className="text-gray-600 mt-1 mb-2">by {book.author}</p>

                    {/* Rating and Comment Count */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1 text-yellow-500 font-medium">
                            ⭐ {avg}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{count} review{count !== 1 ? "s" : ""}</span>
                    </div>
                </div>
            </div>

            {open && (
                <BookModal
                    book={book}
                    comments={comments}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};
export default BookCard