import { ObjectId } from "mongodb";

export const createUser = async (req, res) => {
    try{
        const body = req.body
        const mongoConn = req.mongoConn;
        const collection = mongoConn.collection('users');
        const result = await collection.insertOne({username:body.username, password: body.password});
        res.status(201).json({ _id: result.insertedId, username:body.username });

    } catch (err) {
    res.status(500).send('Error creating document');
  }
}
