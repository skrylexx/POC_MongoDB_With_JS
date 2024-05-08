import React, { useState } from 'react';

const AddMoviePage: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        plot: '',
        genre: [],
        cast: '',
        director: '',
        year: 0,
        type: 'Movie',
        runtime: 0,
        poster: '',
        fullplot: '',
        countries: [],
        writers: [],
        awards: [],
        lastupdated: getCurrentDateTime()
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const id = await createMovie(formData);
            alert(`Film ajouté avec succès. ID: ${id}`);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du film:', error);
            // @ts-ignore
            alert(`Erreur: ${error.message}`);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Ajouter un film</h1>
            <a href={`/`} style={styles.link}> Retour à la page d'accueil </a>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>
                    <br></br>
                    Titre*:
                    <input style={styles.input} type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                </label>
                <label style={styles.label}>
                    Résumé*:
                    <textarea style={styles.textarea} name="plot" value={formData.plot} onChange={handleInputChange} required />
                </label>
                <label style={styles.label}>
                    Genre(s)*:
                    <input style={styles.textarea} name="genre" value={formData.genre} onChange={handleInputChange} required />
                </label>
                <label style={styles.label}>
                    Distribution*:
                    <input style={styles.input} type="text" name="cast" value={formData.cast} onChange={handleInputChange} required />
                </label>
                <label style={styles.label}>
                    Réalisateur*:
                    <input style={styles.input} type="text" name="director" value={formData.director} onChange={handleInputChange} required />
                </label>
                <label style={styles.label}>
                    Année*:
                    <input style={styles.input} type="number" name="year" value={formData.year} onChange={handleInputChange} required />
                </label>
                <label style={styles.label}>
                    Type*:
                    <select style={styles.select} name="type" value={formData.type} onChange={handleInputChange} required>
                        <option value="Animation">Animation</option>
                        <option value="Serie">Serie</option>
                        <option value="Movie">Movie</option>
                    </select>
                </label>
                <label style={styles.label}>
                    Durée (minutes):
                    <input style={styles.input} type="number" name="runtime" value={formData.runtime} onChange={handleInputChange} />
                </label>
                <label style={styles.label}>
                    Affiche (lien):
                    <input style={styles.input} type="url" name="poster" value={formData.poster} onChange={handleInputChange} />
                </label>
                <label style={styles.label}>
                    Description complète:
                    <textarea style={styles.textarea} name="fullplot" value={formData.fullplot} onChange={handleInputChange} />
                </label>
                <label style={styles.label}>
                    Pays (séparés par des virgules):
                    <input style={styles.input} type="text" name="countries" value={formData.countries} onChange={handleInputChange} />
                </label>
                <label style={styles.label}>
                    Scénaristes (séparés par des virgules):
                    <input style={styles.input} type="text" name="writers" value={formData.writers} onChange={handleInputChange} />
                </label>
                <label style={styles.label}>
                    Récompenses (au format JSON):
                    <input style={styles.input} type="text" name="awards" value={formData.awards} onChange={handleInputChange} />
                </label>
                <button style={styles.button} type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddMoviePage;

// Function to send datas and create movie
function createMovie(formData: any): Promise<string> {
    const id = generateId(); // Générer automatiquement l'ID avec 23 caractères alphanumériques
    return fetch(`/api/movie/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la création du film.');
        }
        return id;
    });
}

// ID generation
function generateId(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 23; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}

function getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace('T', ' '); // Format YYYY-MM-DD hh:mm:ss
}

//CSS
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    link: {
        textDecoration: "none",
        color: "#007bff",
        fontWeight: "bold"
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        marginBottom: '10px'
    },
    input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginTop: '4px'
    },
    textarea: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginTop: '4px'
    },
    select: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginTop: '4px'
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px'
    }
};
