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
};

export const deleteCookie = () => {
  // cookie.remove("progress_token");
  // fetch("/api/remove-token-cookie", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(),
  // });
  fetch("/api/remove-token-cookie");
};
