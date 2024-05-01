import React, { useEffect, useState } from "react";

function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("title");
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading indicator

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/movies');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const moviesData = await response.json();
      setMovies(moviesData.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []); // Load movies

  useEffect(() => {
    if (showAllMovies) {
      fetchMovies(); // Reload movies if showAllMovies is True
    }
  }, [showAllMovies]);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      (searchCategory === 'title' && movie.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (searchCategory === 'genres' && movie.genres && movie.genres.some((genre: string) => genre.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (searchCategory === 'cast' && typeof movie.cast === 'string' && movie.cast.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (searchCategory === 'writers' && Array.isArray(movie.writers) && movie.writers.some((writer) => writer.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (searchCategory === 'type' && movie.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    // Sort movies
    const sortedFilteredMovies = filtered.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredMovies(sortedFilteredMovies);
  }, [movies, searchTerm, searchCategory]);

  // Get all movies on click
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
        <h2 style={styles.subHeading}>Recherche de films</h2>
        <div style={styles.searchContainer}>
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            style={styles.select}
          >
            <option value="title">Titre</option>
            <option value="genres">Genres</option>
            <option value="cast">Acteurs</option>
            <option value="writers">Réalisateurs</option>
            <option value="type">Type</option>
          </select>
          <input
            type="text"
            placeholder={`Rechercher par ${searchCategory}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
        </div>
        <h2 style={styles.subHeading}>Liste complète de nos films</h2>
        {loading ? ( // Display loading indicator
          <p>Chargement...</p>
        ) : (
          <>
            <p><strong>{filteredMovies.length}</strong> films</p>
            <ul style={styles.list}>
              {filteredMovies.map((movie) => (
                  <li key={movie._id} style={styles.listItem}>
                    <a href={`/movie/${movie._id}`} style={styles.link}>
                      {movie.title}
                    </a>
                  </li>
              ))}
            </ul>
          </>
        )}

        {/* Show hidden movies */}
        {!showAllMovies && (
            <button style={styles.button} onClick={handleShowAllMovies}>
              Afficher tous les films
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
  searchContainer: {
    display: "flex",
    marginBottom: "15px"
  },
  select: {
    marginRight: "10px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  input: {
    flex: "1",
    padding: "10px",
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
  },
  red: {
    color: "#FF0000",
  }
};

export default Home;
