import cookie from "cookie";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";

async function logoutFromDb(id, token) {
  try {
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();
    if (!isConnected) throw new Error("DB connection error");

    const { token: storedToken } = await db
      .collection("users")
      .findOne(ObjectId(id));

    if (storedToken !== token) throw new Error("Token mismatch");
    const updateResult = await db
      .collection("users")
      .updateOne(
        { _id: ObjectId(id) },
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
  const cookieData = req.cookies["progress_token1622073460654"];
  const id = cookieData.split(".ya").pop();
  const token = cookieData.slice(0, -id.length - 3);

  if (!token || !id) {
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

  const responseDB = await logoutFromDb(id, token);
  if (!responseDB.ok) {
    returnFail(responseDB.error);
    return;
  }
  res.statusCode = 200;
  res.json({ success: true });
};
