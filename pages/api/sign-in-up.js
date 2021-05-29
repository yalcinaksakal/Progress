import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../config/config";
import { MongoClient, ObjectId } from "mongodb";
const client = new OAuth2Client(CLIENT_ID);
const DB_ACCESS =
  "mongodb+srv://yalcinaksakal:95tEPq74uhiLGmT@cluster0.srzeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// yalcinaksakal:95tEPq74uhiLGmT

export async function verify(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    return { isFailed: false, result: payload };
  } catch (err) {
    return {
      isFailed: true,
      result: "Invalid token.",
    };
  }
}

export async function checkIsUser(email) {
  try {
    const client = await MongoClient.connect(DB_ACCESS);
    const db = client.db();
    const progressCollection = db.collection("progress");

    const user = await progressCollection.findOne({ email: email });

    client.close();
    return {
      ok: true,
      isUser: !!user,
      email: user?.email,
      picture: user?.picture,
      given_name: user?.given_name,
      family_name: user?.family_name,
      locale: user?.locale,
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function signUpNewUser({
  email,
  picture,
  given_name,
  family_name,
  locale,
}) {
  try {
    const client = await MongoClient.connect(DB_ACCESS);
    const db = client.db();
    const progressCollection = db.collection("progress");
    const data = { email, picture, given_name, family_name, locale };
    const result = await progressCollection.insertOne(data);
    client.close();
    if (!result.insertedCount) {
      throw new Error("Couldn't sign up.");
    }
    return { ok: true, email, picture, given_name, family_name, locale };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function handler(req, res) {
  if (req.method === "POST") {
    const { type, token } = req.body;
    const { result, isFailed } = await verify(token);

    if (isFailed) {
      res.status(401).json({ error: "Invalid token", message: "Login Failed" });
      return;
    }

    if (type === "login") {
      const userStatus = await checkIsUser(result.email);
      if (!userStatus.ok) {
        res.status(401).json({
          error: "DB error",
          message: "Something went wrong. Please try again",
        });
        return;
      }
      if (!userStatus.isUser) {
        res
          .status(200)
          .json({ auth: true, isUser: false, given_name: result.given_name });
        return;
      }
      res.status(200).json({ ...result, ...userStatus });
      return;
    }
    if (type === "signup") {
      const signingUp = await signUpNewUser(result);
      if (!signingUp.ok) {
        res.status(401).json({
          error: "DB error",
          message: signingUp.error,
        });
        return;
      }

      res.status(200).json({ ...signingUp, isUser: true });
      return;
    }
  }
}

export default handler;
