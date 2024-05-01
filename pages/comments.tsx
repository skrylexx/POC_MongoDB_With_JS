import React, { useEffect, useState } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/movie/comments');
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = await response.json();
        setComments(commentsData.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    const filtered = comments.filter(comment =>
      comment.name && comment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Sort comments
    const sortedFilteredComments = filtered.sort((a, b) => (a.name && b.name) ? a.name.localeCompare(b.name) : 0);
    setFilteredComments(sortedFilteredComments);
  }, [comments, searchTerm]);

  // Return all comments
  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  return (
      <div style={styles.container}>
        <h1 style={styles.heading}><strong>{filteredComments.length}</strong> commentaires déposés sur notre site :</h1>
        <a href={`/`} style={styles.link}>Retour sur la page d'accueil </a>
        <br></br>

        <h2 style={styles.subHeading}>Recherche par nom d'utilisateur</h2>
        {/* Search bar */}
        <input
            type="text"
            placeholder="Bob Dupont..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
        />

        <h2 style={styles.subHeading}>Liste des commentaires</h2>
        <ul style={styles.list}>
          {filteredComments.map((comment, index) => (
              <li
                  key={comment.name}
                  style={{...styles.listItem, display: showAllComments || index < 5 ? 'block' : 'none'}}
              >
                <a href={`/comments/${comment._id}`} style={styles.link}>
                  {comment.name}
                </a>
              </li>
          ))}
        </ul>

        {/* Show loading indicator */}
        {loading && (
          <p>Chargement...</p>
        )}

        {/* Return hidden comments */}
        {!showAllComments && !loading && (
            <button style={styles.button} onClick={handleShowAllComments}>
              Afficher plus de commentaires
            </button>
        )}
      </div>
  );
}

//CSS
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
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
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
