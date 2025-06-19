function getAvgRating(comments) {
    if (!comments || comments.length === 0) return 0;

    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return totalRating / comments.length;
}

function getCommentCount(comments) {
    return comments ? comments.length : 0;
}

export { getAvgRating, getCommentCount };