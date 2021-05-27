import { verify } from "./sign-in-up";
export default async (req, res) => {
  const token = req.cookies["progress_token1622073460654"].slice(1, -1);

  if (!token) {
    res.status(200).json({
      ok: true,
      isLoggedIn: false,
    });
    return;
  }
  const { result, isFailed } = await verify(token);

  console.log(result, isFailed);
  res.status(200).json({
    ok: true,
    isLoggedIn: "working on",
  });
};
