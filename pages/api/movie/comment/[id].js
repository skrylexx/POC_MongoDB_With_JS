import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";



/**
 * @swagger
 * /api/movie/movie-id:
 *   get:
 *     description: Returns comment for a given movie ID
 *     responses:
 *       200:
 *         description: Commentaries for this movie
 * /api/movie/comment-id:
 *   post:
 *     description: insert comment in the DB
 *     parameters:
 *         - id: query
 *           name: id
 *           type: integer
 *           description: The id of the comment targeted
 *         - film_name: query
 *           name: name
 *           type: string
 *           description: The name of the user who posted this comment
 *         - email: query
 *           name: email
 *           type: string
 *           description: The email of the user who posted this comment
 *         - text: query
 *           name: text
 *           type: string
 *           description: The description of this comment
 *         - movie_id: query
 *           name: movie_id
 *           type: string
 *           description: The ID of the film related to this comment
 *     responses:
 *       200:
 *         description: Hello comment
 *       400:
 *          description: no comment data was given to the api
 *   put:
 *     description: modify comment entry
 *     parameters:
 *         - id: query
 *           name: id
 *           type: integer
 *           description: The id of the comment targeted
 *         - body: query
 *           name: arguments
 *           type: array
 *           description: The elements you want to update according to DB (text, name, email, date...)
 *     responses:
 *       200:
 *         description: Hello comment
 *       400:
 *          description: no comment data was given to the api
 *   delete:
 *     description: delete comment entry
 *     parameters:
 *         - id: query
 *           name: id
 *           type: integer
 *           description: The id of the comment targeted
 *     responses:
 *       200:
 *         description: Hello comment
 *       400:
 *          description: no comment data was given to the api
 *
 *
 */


export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const idCommentary =req.query.id
    switch(req.method){
        case "GET":
            try {
                const comment = await db.collection("comments").findOne({ _id: new ObjectId(idCommentary) });
                if (!comment) {
                    res.status(404).json({ error: "Comment not found" });
                    return;
                }
                console.log(comment)

                const movieId = comment.movie_id; // Récupérer l'ID du film depuis le commentaire
                console.log(movieId);
                if (!movieId) {
                    res.status(404).json({ error: "No movie found" });
                    return;
                }

                const movie = await db.collection("movies").findOne({ _id: new ObjectId(movieId) });
                const movieName = movie ? movie.title : "Unknown";
                const moviePoster = movie ? movie.poster : "https://marketplace.canva.com/EAFCO6pfthY/1/0/1600w/canva-blue-green-watercolor-linktree-background-F2CyNS5sQdM.jpg";
                console.log(movieName)
                const commentWithMovie = {
                    ...comment,
                    movie_name: movieName,
                    poster: moviePoster,
                };

                res.status(200).json({ data: commentWithMovie });
            } catch (error) {
                console.error("Error fetching comment:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
            break;

        case "PUT":
            const dbPutCommentary = await db.collection("comments").updateOne({ _id: new ObjectId(idCommentary)}, {$set: { body }});
            res.json({ status: 200, data: dbPutCommentary });
        break;
        case "POST":
            const body = JSON.parse(req.body);
            const dbPostCommentary = await db.collection("comments").insertOne({ body });
            res.json({ status: 200, data: dbPostCommentary });
        break;
        case "DELETE":
            const dbDeleteCommentary = await db.collection("comments").deleteOne({ _id : new ObjectId(idCommentary) });
            res.json({ status: 200, data: dbDeleteCommentary });
        break;
        default:
            res.json({ status:404, msg:'Wrong operation.'})
        break;
    }
}