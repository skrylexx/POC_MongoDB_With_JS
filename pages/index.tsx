import { redirect } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";
import {count} from "types-ramda";

function Home() {
  const [movies, setMovies] = useState([]);
  const [showAllMovies, setShowAllMovies] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/movies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const moviesData = await response.json();
        setMovies(moviesData.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Fonction pour afficher tous les films lorsqu'on clique sur le bouton
  const handleShowAllMovies = () => {
    setShowAllMovies(true);
  };

  return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Bienvenue sur <span style={styles.red}>☭ notre ☭ </span> site !</h1>
        <p style={styles.paragraph}>C'est la page d'accueil.</p>
        <div style={styles.bar}>
          <a href={`/movie/add`} style={styles.link}> Ajouter un film </a>
          <a href={`/comments`} style={styles.link}> Liste des commentaires </a>
        </div>
        <h2 style={styles.subHeading}>Liste de nos {movies.length} films</h2>
        <ul style={styles.list}>
          {movies.map((movie, index) => (
              <li key={movie._id} style={{...styles.listItem, display: showAllMovies || index < 5 ? 'block' : 'none' }}>
                <a href={`/movie/${movie._id}`} style={styles.link}>
                  {movie.title}
                </a>
              </li>
          ))}
        </ul>

        {/* Bouton pour afficher tous les films masqués */}
        {!showAllMovies && (
            <button style={styles.button} onClick={handleShowAllMovies}>
              Afficher plus de films
            </button>
        )}
      </div>
  );
}

// CSS
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
  bar:{
    display: "flex",
    justifyContent: "space-between",
  },
  paragraph: {
    fontSize: "1rem",
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
  },
  red: {
    color: "#FF0000",
  }
};

export default Home;
