import cookie from "cookie";

//days
export const EXPIRES = 30 * 24 * 60 * 60;

import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../config/config";

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

export default async (req, res) => {
  const returnFail = () => {
    res.status(401).json({
      error: "Failed",
      message: "Invalid token data",
    });
  };

  const { token, email } = req.body;
  if (!token || !email) {
    returnFail();
    return;
  }

  const { result, isFailed } = await verify(token);
  if (isFailed || result.email !== email) {
    returnFail();
    return;
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("progress_token1622073460654", JSON.stringify(req.body), {
      httpOnly: true,
      //   secure: process.env.NODE_ENV !== "development",
      maxAge: EXPIRES,
      sameSite: "strict",
      path: "/",
    })
  );

  res.statusCode = 200;
  res.json({ success: true });
};
