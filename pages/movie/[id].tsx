import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

function MovieDetails() {
    const router = useRouter();
    const { id } = router.query; // Get ID from URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/movie/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const movieData = await response.json();
                setMovie(movieData.data.movie);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError(true);
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieDetails(); // If ID in URL : call function
        }
    }, [id]); // Execute UseEffect on each id change

    // Function for a clean render of lists
    const renderList = (value: any[]) => {
        return (
            <ul style={styles.list}>
                {Array.isArray(value) ? (
                    value.map((element: any, index: React.Key | undefined) => (
                        <li key={index}>
                            - {element ?? ''}
                        </li>
                    ))
                ) : (
                    <li>- {value ?? 'Unknown'}</li>
                )}
            </ul>
        );
    };

    // Get imdb stats
    const getRate = (imdb: { rating: any; votes: any; }) => {
        return (
            <ul style={styles.list}>
                <li>
                      - Rating : {imdb?.rating ?? 'Undefined'}
                </li>
                <li>
                      - Votes : {imdb?.votes ?? 'Undefined'}
                </li>
            </ul>
        );
    };

    // Get awards
    const getAwards = (awards: { wins: any; nominations: any; text: any; }) => {
        return (
            <ul style={styles.list}>
                <li>
                      - Wins : {awards?.wins ?? 'Undefined'}
                </li>
                <li>
                      - Nominations : {awards?.nominations ?? 'Undefined'}
                </li>
                <li>
                      - Commentary : {awards?.text ?? 'Undefined'}
                </li>
            </ul>
        );
    };

    // Get YEAR only
    const parseYear = (released: string | any[]) => {
        return released?.slice(0, 4) ?? 'Undefined'; // Afficher '-' si released est undefined
    };

    // Loading message
    if (loading) {
        return <p style={styles.loading}>Chargement en cours...</p>;
    }

    // Error handling
    if (error) {
        return <p style={styles.error}>Une erreur s'est produite lors du chargement des détails du film.</p>;
    }

    // Movie details
    if (movie) {
        // @ts-ignore
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>Détails du Film</h1>
                <a href={`/`} style={styles.link}>Retour au menu</a>
                <br/>
                <br/>
                <div style={styles.detailsContainer}>
                    <div style={styles.posterContainer}>
                        <img src={movie?.poster ?? ''} alt={'Poster indisponible'} style={styles.poster} /> {/* Return '' if undefined */}
                    </div>
                    <div style={styles.infoContainer}>
                        <p style={styles.info}><strong>Titre :</strong> {movie?.title ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Année :</strong> {parseYear(movie?.released) ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Genres :</strong> {renderList(movie?.genres) ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Description :</strong> {movie?.plot ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Stats :</strong> {getRate(movie?.imdb) ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Awards :</strong> {getAwards(movie?.awards) ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Casting :</strong> {renderList(movie?.cast) ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Languages :</strong> {renderList(movie?.languages) ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Directors :</strong> {renderList(movie?.directors) ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Writers :</strong> {renderList(movie?.writers) ?? 'Undefined'}</p><br></br>
                        <strong><img src={movie?.poster ?? ''} alt={'!! Poster indisponible !!'} style={styles.fullPoster}/></strong>
                        <p style={styles.info}><strong>Countries :</strong> {renderList(movie?.countries) ?? 'Undefined'}</p>
                        <p style={styles.info}><strong>Full plot :</strong> {movie?.fullplot ?? 'Undefined'}</p>
                    </div>
                </div>
            </div>
        );
    }

    return <p style={styles.error}>Aucun détail de film trouvé pour cet ID.</p>;
}

//CSS
const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px"
    },
    link: {
        textDecoration: "none",
        color: "#007bff",
        fontWeight: "bold"
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#333"
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start"
    },
    posterContainer: {
        marginRight: "20px"
    },
    poster: {
        width: "200px",
        height: "300px",
        objectFit: "cover",
        borderRadius: "8px"
    },
    infoContainer: {
        flex: "1"
    },
    info: {
        fontSize: "1.2rem",
        marginBottom: "10px"
    },
    loading: {
        fontSize: "1.2rem",
        textAlign: "center",
        color: "#333"
    },
    error: {
        fontSize: "1.2rem",
        color: "red",
        textAlign: "center"
    },
    list: {
        listStyleType: "none",
        padding: 0,
        margin: 0
    },
    fullPoster: {
        width: "100%",
        marginTop: "20px",
        borderRadius: "8px"
    },
    backButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
        textDecoration: "none"
    }
};

export default MovieDetails;
