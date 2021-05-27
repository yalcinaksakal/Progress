import cookie from "cookie";
export default handler = (req, res) => {
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
