import clientPromise from "../../lib/mongodb";

/**
* @swagger
* /api/movies:
*   get:
*     description: Returns all movies
*     responses:
*       200:
*         description: Hello Movies
*/

export default async function handler(req, res) {
    try{
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const limit = req.query.limit || 100; // Définir le nombre de films à renvoyer par défaut à 100
        const page = req.query.page || 1; // Définir la page à afficher par défaut à 1
        const skip = (page - 1) * limit; // Calculer le nombre de films à sauter
        const movies = await db.collection('movies').find().toArray();
        res.json({ status: 200, data: movies });
    }catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
}
