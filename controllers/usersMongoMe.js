import { ObjectId } from "mongodb";



export const myProfile = async (req, res) => {
    const {username, password} = req.headers
    const mongoConn = req.mongoConn;
    const collection = mongoConn.collection('users');
     const user = await collection.findOne({username: username, password: password})
     if (!user){
        return res.status(409).send("You put something wrong.")
     }
     const [result] = await req.sqlconn.query("SELECT COUNT(*) AS NumberOfProducts FROM messages WHERE username = ?;", [username])
     res.json({"username": username,
"encryptedMessagesCount": result[0]})

}