import { MongoClient } from "mongodb";
const DB_ACCESS =
  "mongodb+srv://yalcinaksakal:95tEPq74uhiLGmT@cluster0.srzeq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// yalcinaksakal:95tEPq74uhiLGmT

async function checkIsLoggedIn(email, token) {
  try {
    const client = await MongoClient.connect(DB_ACCESS);
    const db = client.db();
    const progressCollection = db.collection("progress");

    const user = await progressCollection.findOne({ email: email });

    const isLoggedIn = user.isLoggedIn;
    const isEmailValid = email === user.email;
    const isTokenValid = token === user.token;
    //if there is less than an hour time left to expire assume expired.
    const isExpired = new Date().getTime() + 60 * 60 > user.expires;
    if (isLoggedIn && isEmailValid && isTokenValid && !isExpired)
      return {
        ok: true,
        isLoggedIn: true,
        isUser:true,
        email: user.email,
        picture: user.picture,
        given_name: user.given_name,
        family_name: user.family_name,
        locale: user.locale,
      };
    client.close();
    return {
      ok: true,
      isLoggedIn: false,
    };
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
  let cookieData = req.cookies["progress_token1622073460654"];
  cookieData = cookieData
    ? JSON.parse(cookieData)
    : { token: null, email: null };

  const { token, email } = cookieData;

  if (!token || !email) {
    returnFail();
    return;
  }
  //check db if user is logged in, check token, email, expires values from DB to validate lodgin

  const userStatus = await checkIsLoggedIn(email, token);
  if (!userStatus.ok || !userStatus.isLoggedIn) {
    returnFail();
    return;
  }

  res.status(200).json({
    ...userStatus,
  });
};
