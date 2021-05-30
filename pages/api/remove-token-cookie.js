import cookie from "cookie";
import { connectToDatabase } from "../../util/mongodb";

async function logoutFromDb(email, token) {
  try {
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();
    if (!isConnected) throw new Error("DB connection error");

    const { token: storedToken } = await db
      .collection("users")
      .findOne({ email: email });

    if (storedToken !== token) throw new Error("Token mismatch");
    const updateResult = await db
      .collection("users")
      .updateOne(
        { email: email },
        { $set: { isLoggedIn: false, token: "", expires: 0 } }
      );
    return {
      ok: true,
      result: updateResult,
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

export default async (req, res) => {
  const returnFail = (err = "Sth went wrong.") => {
    res.status(401).json({
      ok: false,
      Error: err,
    });
  };
  let cookieData = req.cookies["progress_token1622073460654"];
  cookieData = cookieData
    ? JSON.parse(cookieData)
    : { token: null, email: null };

  const { token, email } = cookieData;

  if (!token || !email) {
    returnFail("No Cookie");
    return;
  }
  //delete cookie, no matter data in cookie is true or not
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("progress_token1622073460654", "", {
      httpOnly: true,
      //   secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );

  const responseDB = await logoutFromDb(email, token);
  if (!responseDB.ok) {
    returnFail(responseDB.error);
    return;
  }
  res.statusCode = 200;
  res.json({ success: true });
};
