import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import BookCard from '../components/BookCard';

const Homepage = () => {
    const { books } = useAppContext();

    useEffect(() => {
        console.log('books', books);
    }, [books]);

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div>
            <h1 className="text-3xl font-bold text-center tracking-widest text-blue-400 mb-10">Book Explorer</h1>

            
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books?.map((book) => (
                    <BookCard book={book} key={book._id} />
                ))}
            </div>
        </div>
    );
};

export default Homepage;
