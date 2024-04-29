import { redirect } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/movie/comments');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const commentsData = await response.json();
        setComments(commentsData.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  // Fonction pour afficher tous les films lorsqu'on clique sur le bouton
  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  return (
      <div style={styles.container}>
        <h1 style={styles.heading}><strong>{comments.length}</strong> commentaires déposés sur notre site :</h1>
        <a href={`/`} style={styles.link}>Retour sur la page d'accueil </a>


        <h2 style={styles.subHeading}>Liste des commentaires</h2>
        <ul style={styles.list}>
          {comments.map((comment, index) => (
              <li key={comment.name}
                  style={{...styles.listItem, display: showAllComments || index < 5 ? 'block' : 'none'}}>
                <a href={`/comments/${comment._id}`} style={styles.link}>
                  {comment.name}
                </a>
              </li>
          ))}
        </ul>

        {/* Bouton pour afficher tous les films masqués */}
        {!showAllComments && (
            <button style={styles.button} onClick={handleShowAllComments}>
              Afficher plus de commentaires
            </button>
        )}
      </div>
  );
}

// Styles CSS en tant qu'objet JavaScript
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333"
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px"
  },
  subHeading: {
    fontSize: "1.5rem",
    marginTop: "30px",
    marginBottom: "15px"
  },
  list: {
    listStyleType: "none",
    padding: 0
  },
  listItem: {
    marginBottom: "10px"
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  }
};

export default Comments;
