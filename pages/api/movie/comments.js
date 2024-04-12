import { error } from "console";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { title } from "process";


/**
* @swagger
* /api/movie/comments:
*   get:
*     description: Returns all commentaries
*     responses:
*       200:
*         description: Hello to each commentaries
*/


export default async function handler(req, res) {
    const client = await clientPromise;
    const idMovie = req.query.id
    const db = client.db("sample_mflix");
    // const dbMovie = await db.collection("movies").findOne({ _id : new ObjectId(idMovie) });
    const dbCommentary = await db.collection("comments").find().toArray();
    res.json({ status: 200, data: dbCommentary });
}