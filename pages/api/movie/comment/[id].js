import { error } from "console";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { title } from "process";



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
            // Tous les commentaires d'un film
            const idMovie = req.query.id
            const dbCommentaryByFilm = await db.collection("comments").find({ movie_id : new ObjectId(idMovie)}).toArray();
            res.json({ status: 200, data: dbCommentaryByFilm });
            // Un seul commentaire
            //const dbCommentaryByFilm = await db.collection("comments").find({ movie_id : new ObjectId(idCommentary)});
            //res.json({ status: 200, data: dbCommentaryByFilm });
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