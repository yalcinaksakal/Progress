import cookie from "cookie";

export default (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(
      "progress_token1622073460654",
      JSON.stringify(req.body.token),
      {
        httpOnly: true,
        //   secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
        path: "/",
      }
    )
  );

  res.statusCode = 200;
  res.json({ success: true });
};
