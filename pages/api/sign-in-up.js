import { OAuth2Client } from "google-auth-library";
import { CLIENT_ID } from "../../config/config";

const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    // const userid = payload["sub"];
    // // If request specified a G Suite domain:
    // // const domain = payload['hd'];
    return { success: true, result: payload };
  } catch (err) {
    return {
      success: false,
      result: err,
    };
  }
}
async function handler(req, res) {
  if (req.method === "POST") {
    const { type, token } = req.body;
    const verificationResult = await verify(token);
    console.log(verificationResult);
  }
}

export default handler;
// const processType = changePwd
//   ? "update"
//   : isLogin
//   ? "signInWithPassword"
//   : "signUp";
// console.log(processType);
// const url = `https://identitytoolkit.googleapis.com/v1/accounts:${processType}?key=AIzaSyDEnXFbshker5Olr0956buPRDcbGY7HxjU`;
// const body = changePwd
//   ? JSON.stringify({
//       idToken: token,
//       password: password,
//       returnSecureToken: false,
//     })
//   : JSON.stringify({
//       email: email,
//       password: password,
//       returnSecureToken: returnSecureToken,
//     });
// const response = await fetch(url, {
//   method: "POST",
//   body: body,
//   headers: { "Content-Type": "application/json" },
// });
// const data = await response.json();
// if (!response.ok) {
//   let errorMsg = "Authentication Failed";
//   if (!isLogin && data && data.error && data.error.message)
//     errorMsg = data.error.message.replace(/_/g, " ").toLowerCase();
//   res.status(400).json({ error: { code: 400, message: errorMsg } });
//   return;
// }
// res
//   .status(200)
//   .json(
//     changePwd
//       ? data
//       : isLogin
//       ? { expiresIn: data.expiresIn, idToken: data.idToken }
//       : { message: "Account is successfully created." }
//   );
