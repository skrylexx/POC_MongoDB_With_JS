import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";


/**
 * @swagger
 * /api/movie/movie-id:
 *   get:
 *     description: Returns all comments for a given movie ID
 *     responses:
 *       200:
 *         description: Commentaries for this movie
 *
 */


export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const idMovie = req.query.id
    console.log(req.query.id)
        try {
            const comments = await db.collection("comments").find({movie_id: new ObjectId(idMovie)}).toArray();
            if (!comments) {
                res.status(404).json({error: "Comment not found"});
                return;
            }
            res.status(200).json({data: comments});
        } catch (error) {
            console.error("Error fetching comment:", error);
            res.status(500).json({error: "Internal Server Error"});
        }
    }