import { verify, checkIsUser } from "./sign-in-up";
export default async (req, res) => {
  const returnFail = () => {
    res.status(200).json({
      ok: true,
      isLoggedIn: false,
    });
  };
  const token = req.cookies["progress_token1622073460654"]?.slice(1, -1);

  if (!token) {
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
