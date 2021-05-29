import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../config/config";
import { MongoClient, ObjectId } from "mongodb";
import { EXPIRES } from "./set-token-cookie";
const client = new OAuth2Client(CLIENT_ID);
const DB_ACCESS =
  "mongodb+srv://yalcinaksakal:95tEPq74uhiLGmT@cluster0.srzeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// yalcinaksakal:95tEPq74uhiLGmT

async function verify(token) {
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

async function checkIsUser(email) {
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
async function updateUserSession(token, email) {
  try {
    const client = await MongoClient.connect(DB_ACCESS);
    const db = client.db();
    const progressCollection = db.collection("progress");
    const expires = new Date().getTime() + EXPIRES;
    const updateResult = await progressCollection.updateOne(
      { email: email },
      { $set: { isLoggedIn: true, token: token, expires: expires } }
    );

    client.close();
    return {
      ok: true,
      result: updateResult,
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
    const data = {
      email,
      picture,
      given_name,
      family_name,
      locale,
      token: "",
      expires: 0,
      isLoggedIn: false,
    };
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
      const dbError = () =>
        res.status(401).json({
          error: "DB error",
          message: "Something went wrong. Please try again",
        });
      if (!userStatus.ok) {
        dbError();
        return;
      }
      if (!userStatus.isUser) {
        res
          .status(200)
          .json({ auth: true, isUser: false, given_name: result.given_name });
        return;
      }
      //success, add tokin and expires into db
      const updateSessionResult = await updateUserSession(token, result.email);
      if (!updateSessionResult.ok) {
        dbError();
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
