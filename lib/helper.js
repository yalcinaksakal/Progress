import cookie from "js-cookie";

export const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  return adjExpirationTime - currentTime;
};

export const retriveStoredToken = () => {
  const localData = localStorage.getItem("token");

  if (!localData) return { initialToken: null, expirationTime: null };

  const { token, expirationTime, userName, loginType } = JSON.parse(
    localStorage.getItem("token")
  );

  const remainingTime = calculateRemainingTime(expirationTime);

  //if remaining time < 1 minute, treat token as not valid
  // if (remainingTime < 60000) {
  //   localStorage.removeItem("token");
  //   return { initialToken: null, expirationTime: null };
  // }
  return { initialToken: token, expirationTime, userName, loginType };
};

export const setCookie = cookieData => {
  // cookie.set("progress_token", JSON.stringify(cookieData), { expires: 1 });

  // const myCookie = cookie.get("progress_token");
  // console.log(myCookie);

  fetch("/api/set-token-cookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cookieData),
  });

  fetch("/api/is-logged-in");
};

export const deleteCookie = () => {
  // cookie.remove("progress_token");
  fetch("/api/remove-token-cookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
};
