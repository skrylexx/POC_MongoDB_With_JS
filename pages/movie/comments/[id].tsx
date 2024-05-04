import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

function Comments() {
    const router = useRouter();
    const { id } = router.query; // Get ID from URL
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/movie/allComments/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments for this movie');
                }
                const commentsData = await response.json();
                setComments(commentsData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError(true);
                setLoading(false);
            }
        };

        if (id) {
            fetchComments(); // If ID in URL : call function
        }
    }, [id]);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching comments for this movie.</p>;
    }

    if (comments) {
        return (
        <div style={styles.commentContainer}>
            <h2 style={styles.commentTitle}>Commentaires :</h2>
            {comments.length === 0 ? (
                <p style={styles.noComment}>Pas de commentaire disponible pour ce film.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} style={styles.commentBox}>
                        <p style={styles.commentUser}>Utilisateur : {comment.name}</p>
                        <p style={styles.commentContent}>Commentaire : {comment.text}</p>
                        <p style={styles.commentDate}>Date : {comment.date}</p>
                    </div>
                ))
            )}
        </div>
    );
    }
}

const styles = {
    commentContainer: {
        gridRow: "3 / 4",
        gridColumn: "1 / -1",
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        overflowY: "scroll",
        maxHeight: "300px",
    },
    commentBox: {
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
    },
    commentUser: {
        fontWeight: "bold",
        marginBottom: "5px",
        color: "#333",
    },
    commentContent: {
        marginBottom: "5px",
        color: "#333",
    },
    commentDate: {
        color: "#777",
        fontSize: "0.8rem",
    },
    noComment: {
        color: "#777",
        fontStyle: "italic",
    },
};

export default Comments;
