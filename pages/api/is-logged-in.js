import { verify, checkIsUser } from "./sign-in-up";
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

  const { result, isFailed } = await verify(token);

  if (isFailed) {
    returnFail();
    return;
  }
  const userStatus = await checkIsUser(result.email);
  if (!userStatus.ok || !userStatus.isUser) {
    returnFail();
    return;
  }

  res.status(200).json({
    ...userStatus,
    isLoggedIn: true,
  });
};
