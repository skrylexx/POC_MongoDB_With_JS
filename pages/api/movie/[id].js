import { error } from "console";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { title } from "process";



/**
 * @swagger
 * /api/movie-id:
 *   get:
 *     description: Returns movies
 *     parameters:
 *         - id: query
 *           name: id
 *           type: integer
 *           description: The id of the movie targeted
 *     responses:
 *       200:
 *         description: Hello Movies
 *   post:
 *     description: insert movies in the DB
 *     parameters:
 *         - id: query
 *           name: id
 *           type: integer
 *           description: The id of the movie targeted
 *         - plot: query
 *           name: plot
 *           type: string
 *           description: The synopsis of this movie
 *         - genres: query
 *           name: genres
 *           type: array
 *           description: Array of the genres of this film. Key is an integer, value is a string ('Animation', 'Short', 'Comedy'...)
 *         - runtime: query
 *           name: runtime
 *           type: integer
 *           description: Count of runtime
 *         - cast: query
 *           name: cast
 *           type: array
 *           description: The cast of the movie. As the genres, key is integer and name is a string
 *         - num_mflix_comments: query
 *           name: num_mflix_comments
 *           type: integer
 *           description: Total count of commentaries for this movie
 *         - poster: query
 *           name: poster
 *           type: string
 *           description: The poster of this movie. An image with an Url
 *         - title: query
 *           name: title
 *           type: string
 *           description: The title of this movie
 *         - fullplot: query
 *           name: fullplot
 *           type: string
 *           description: The full plot of this movie
 *         - languages: query
 *           name: languages
 *           type: array
 *           description: Array of languages for this movie. Key = int, value = str
 *         - released: query
 *           name: released
 *           type: time
 *           description: The date when this film was released
 *         - directors: query
 *           name: directors
 *           type: array
 *           description: An array of directors for this movie
 *         - writers: query
 *           name: writers
 *           type: array
 *           description: The writers of the movie
 *         - awards: query
 *           name: award
 *           type: object
 *           description: Object with 'wins' (integer), 'nominations' (integer) and 'text' (string)
 *         - lastupdated: query
 *           name: lastupdated
 *           type: date
 *           description: The date of the last update for this movie
 *         - year: query
 *           name: year
 *           type: time
 *           description: The year this movie were released
 *         - imbd: query
 *           name: imbd
 *           type: object
 *           description: Object with 'rating', 'votes' and 'id'
 *         - countries: query
 *           name: countries
 *           type: array
 *           description: The different countries of this movie
 *         - tomatoes: query
 *           name: tomatoes
 *           type: object
 *           description: Object with 'viewer' (object with 'Rating', 'numReviews' and 'meter'), and 'lastUpdated' (date)
 *     responses:
 *       200:
 *         description: Hello new movie
 *       400:
 *          description: no movie data was given to the api
 *   put:
 *     description: modify movies entry
 *     parameters:
 *         - id: query
 *           name: id
 *           type: string
 *           description: The id of the movie targeted
 *         - body: query
 *           name: elements
 *           type: array
 *           description: The elements that you want to update
 *     responses:
 *       200:
 *         description: Movie up to date
 *       400:
 *          description: no movie data was given to the api
 *   delete:
 *     description: delete movies entry
 *     parameters:
 *         - id: query
 *           name: id
 *           type: integer
 *           description: The id of the movie targeted
 *     responses:
 *       200:
 *         description: Movie deleted
 *       400:
 *          description: no movie data was given to the api
 *
 *
 */


export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix"); 
    
    const idMovie = req.query.id
    switch (req.method) {
        case "POST":
            try {
                const body = req.body; // Pas besoin de JSON.parse si req.body est déjà un objet
                const dbInsert = await db.collection("movies").insertOne(body);
                res.json({ status: 200, data: { movie: dbInsert } });
            } catch (error) {
                console.error("Erreur lors de la manipulation du corps de la requête :", error);
                res.status(400).json({ error: 'Erreur lors de la manipulation du corps de la requête' });
            }
            break;
        case "GET":
            const dbMovie = await db.collection("movies").findOne({ _id : new ObjectId(idMovie) });
            res.json({ status: 200, data: {movie: dbMovie} });
        break;
        case "DELETE":
            const dbDelete = await db.collection('movies').deleteOne({ _id : new ObjectId(idMovie) });
            res.json({ status: 200, data: {movie: dbDelete} });
        break;
        case "PUT":
            const dbUpdate = await db.collection("movies").updateOne({ _id : new ObjectId(idMovie)}, { $set: { body }})
            res.json({ status: 200, data: {movie: dbUpdate} });
        break;
        default:
            res.json({ status:405, msg:'Non authorisé.'})
        break;
    }
}