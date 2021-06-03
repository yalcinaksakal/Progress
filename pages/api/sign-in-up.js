import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../config/config";
import { EXPIRES } from "./set-token-cookie";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";

const client = new OAuth2Client(CLIENT_ID);

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
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();
    if (!isConnected) throw new Error("DB connection error");
    const user = await db.collection("users").findOne({ email: email });
    return {
      ok: true,
      isUser: !!user,
      email: user?.email,
      picture: user?.picture,
      given_name: user?.given_name,
      family_name: user?.family_name,
      locale: user?.locale,
      id: user?._id?.toString(),
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

///update by id
async function updateUserSession(token, id, picture = null) {
  try {
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();
    if (!isConnected) throw new Error("DB connection error");

    const expires = new Date().getTime() + EXPIRES * 1000;
    const data = picture
      ? { isLoggedIn: true, token: token, expires: expires, picture: picture }
      : { isLoggedIn: true, token: token, expires: expires };
    const updateResult = await db
      .collection("users")
      .updateOne({ _id: ObjectId(id) }, { $set: data });

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
  token,
}) {
  try {
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();
    if (!isConnected) throw new Error("DB connection error");

    const data = {
      email,
      picture,
      given_name,
      family_name,
      locale,
      token,
      expires: new Date().getTime() + EXPIRES * 1000,
      isLoggedIn: true,
    };
    const result = await db.collection("users").insertOne(data);

    if (!result.insertedCount) {
      throw new Error("Couldn't sign up.");
    }
    return {
      ok: true,
      email,
      picture,
      given_name,
      family_name,
      locale,
      id: result.ops[0]._id.toString(),
    };
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

      //success, add token and expires into db
      const updateSessionResult = await updateUserSession(
        token,
        userStatus.id,
        result.picture
      );
      if (!updateSessionResult.ok) {
        dbError();
        return;
      }

      res.status(200).json({ ...result, ...userStatus });
      return;
    }
    if (type === "signup") {
      const signingUp = await signUpNewUser({ ...result, token });
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
