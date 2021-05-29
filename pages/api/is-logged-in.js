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

  const userStatus = await checkIsUser(email);
  if (!userStatus.ok || !userStatus.isUser) {
    returnFail();
    return;
  }

  res.status(200).json({
    ...userStatus,
    isLoggedIn: true,
  });
};
