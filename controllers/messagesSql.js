
import { ObjectId } from "mongodb";



export const  encryptMessage = async(req, res) => {
    const body = req.body
    const sqlConnection = req.sqlconn
    const mongoConn = req.mongoConn;
    const collection = await mongoConn.collection('users')
    const user = await collection.findOne({username: body.username ,password:body.password})
    
    if (body.cipherType !== "reverse" || !user){
        return res.status(409).send("You put something wrong.")
    }
    const message = body.message
    const encrypt = message.split('').reverse().join('');
    await sqlConnection.query("INSERT INTO messages (username, cipher_type, encrypted_text) VALUES (?, ?, ? )", [user.username, encrypt, body.cipherType])
    res.status(201).json({"id":new ObjectId(user._id), "cipherType": "reverse", "encryptedText":encrypt})
}

export const decryptMessage = async (req, res) => {
    const body = req.body
    const intId = parseInt(body.messageId)
    const sqlConnection = req.sqlconn
    const [result] = await sqlConnection.query("SELECT * FROM `messages` WHERE `id` = ? ",[intId])
    
    const enc = result[0].cipher_type
    console.log(enc)

    const cen = enc.split('').reverse().join('');

    res.json({id:intId, decryptedText:cen})

}

export const listMyMessages = async (req, res) => {
    const {username, password} = req.headers
    const mongoConn = req.mongoConn;
    const collection = mongoConn.collection('users');
     const user = await collection.findOne({username: username, password: password})
     if (!user){
        return res.status(409).send("You put something wrong.")
     }
     const [result] = await req.sqlconn.query("SELECT * FROM messages WHERE username = ?;", [username])
     res.json({itens:result})
}