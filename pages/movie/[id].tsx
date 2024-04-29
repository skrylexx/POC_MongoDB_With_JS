import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

function MovieDetails() {
    const router = useRouter();
    const { id } = router.query; // Récupération de l'id depuis l'URL
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
                setLoading(false); // Marquer le chargement comme terminé
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError(true); // Marquer une erreur
                setLoading(false); // Arrêter le chargement
            }
        };

        if (id) {
            fetchMovieDetails(); // Appeler la fonction de récupération des détails du film si l'id est présent
        }
    }, [id]); // Exécuter useEffect à chaque changement de 'id'

    // Fonction utilitaire pour rendre une liste d'éléments
    const renderList = (value) => {
        return (
            <ul style={styles.list}>
                {value?.map((element, index) => ( // Utilisation de l'opérateur optionnel ?. pour éviter les erreurs si value est undefined
                    <li key={index}>
                          - {element ?? '-'}{/* Afficher 'Undefined' si element est undefined */}
                    </li>
                ))}
            </ul>
        );
    };

    // Fonction utilitaire pour obtenir les statistiques IMDb
    const getRate = (imdb) => {
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

    // Fonction utilitaire pour obtenir les récompenses
    const getAwards = (awards) => {
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

    // Fonction utilitaire pour extraire l'année à partir de la date de sortie
    const parseYear = (released) => {
        return released?.slice(0, 4) ?? 'Undefined'; // Afficher '-' si released est undefined
    };

    // Afficher un message pendant le chargement
    if (loading) {
        return <p style={styles.loading}>Chargement en cours...</p>;
    }

    // Afficher un message d'erreur si une erreur s'est produite
    if (error) {
        return <p style={styles.error}>Une erreur s'est produite lors du chargement des détails du film.</p>;
    }

    // Afficher les détails du film si le chargement est terminé avec succès
    if (movie) {
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>Détails du Film</h1>
                <div style={styles.detailsContainer}>
                    <div style={styles.posterContainer}>
                        <img src={movie?.poster ?? ''} alt={'Poster indisponible'} style={styles.poster} /> {/* Utilisation de l'opérateur optionnel ?. pour éviter les erreurs si movie est undefined */}
                    </div>
                    <div style={styles.infoContainer}>
                        <p style={styles.info}><strong>Titre :</strong> {movie?.title ?? 'Undefined'}</p> {/* Afficher 'Undefined' si movie ou movie.title est undefined */}
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

// Styles CSS en tant qu'objet JavaScript
const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#eee",
        backgroundColor: "#222",
        borderRadius: "8px"
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px"
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
        color: "#eee"
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
    }
};

export default MovieDetails;
