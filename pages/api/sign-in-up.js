import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../config/config";

import { getDbConnection } from "./db-connection";
import { EXPIRES } from "./set-token-cookie";
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
    const progressCollection = await getDbConnection();
    const user = await progressCollection.findOne({ email: email });
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
    const progressCollection = await getDbConnection();
    const expires = new Date().getTime() + EXPIRES * 1000;

    const updateResult = await progressCollection.updateOne(
      { email: email },
      { $set: { isLoggedIn: true, token: token, expires: expires } }
    );
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
    const progressCollection = await getDbConnection();
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
    const result = await progressCollection.insertOne(data);

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
    console.log(result);
    console.log("token verified by google");
    if (isFailed) {
      res.status(401).json({ error: "Invalid token", message: "Login Failed" });
      return;
    }

    if (type === "login") {
      console.log("checking user");
      const userStatus = await checkIsUser(result.email);
      console.log("user status gathered");
      console.log(userStatus);
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
