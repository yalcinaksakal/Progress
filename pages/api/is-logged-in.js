import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

//by id
async function checkIsLoggedIn(id, token) {
  try {
    const { client, db } = await connectToDatabase();
    const isConnected = await client.isConnected();

    if (!isConnected) throw new Error("DB connection error");
    const user = await db.collection("users").findOne(ObjectId(id));

    if (!user)
      return {
        ok: true,
        isLoggedIn: false,
      };
    const isLoggedIn = user.isLoggedIn;
    const isTokenValid = token === user.token;
    // //if there is less than an hour time left to expire assume expired.
    const isExpired = new Date().getTime() + 60 * 60 * 1000 > user.expires;

    if (isLoggedIn && isTokenValid && !isExpired)
      return {
        ok: true,
        isLoggedIn: true,
        isUser: true,
        email: user.email,
        picture: user.picture,
        given_name: user.given_name,
        family_name: user.family_name,
        locale: user.locale,
      };
    else throw new Error("Not authorized");
  } catch (err) {
    return { ok: false, isLoggedIn: false, error: err.message };
  }
}

export default async (req, res) => {
  const returnFail = () => {
    res.status(200).json({
      ok: true,
      isLoggedIn: false,
    });
  };
  const cookieData = req.cookies["progress_token1622073460654"];
  const id = cookieData.split(".ya").pop();
  const token = cookieData.slice(0, -id.length - 3);

  // console.log("id: ", id);
  // console.log("token: ", token);

  if (!token || !id) {
    returnFail();
    return;
  }
  //check db if user is logged in, check token, email, expires values from DB to validate lodgin

  const userStatus = await checkIsLoggedIn(id, token);

  if (!userStatus.ok || !userStatus.isLoggedIn) {
    returnFail();
    return;
  }

  res.status(200).json({
    ...userStatus,
  });
};
