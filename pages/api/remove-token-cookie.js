import cookie from "cookie";
import { getDbConnection } from "./db-connection";

async function logoutFromDb(email, token) {
  try {
    const progressCollection = await getDbConnection();
    const { tokenInDB } = await progressCollection.findOne({ email: email });
    if (tokenInDB !== token) throw new Error("Token mismatch");
    const updateResult = await progressCollection.updateOne(
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

export default (req, res) => {
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
    returnFail("Cookie mismatch");
    return;
  }
  const responseDB = logoutFromDb(email, token);
  if (!responseDB.ok) {
    returnFail(responseDB.error);
    return;
  }

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
  res.statusCode = 200;
  res.json({ success: true });
};
