const CLIENT_ID =
  "736076693286-m98km6smat5d0rb7q58fi19ae9os0trp.apps.googleusercontent.com";

const AUTO_LOGOUT_TIME_IN_SECONDS = 120;

const NAV_ITEMS = [
  {
    name: "Categories",
    icon: <i className="fas fa-ellipsis-h"></i>,
    isAuthNeeded: false,
  },
  {
    name: "Cart",
    icon: <i className="fas fa-shopping-cart"></i>,
    isAuthNeeded: false,
  },
  {
    name: "Favourites",
    icon: <i className="far fa-star"></i>,
    isAuthNeeded: true,
  },
  {
    name: "Profile",
    icon: <i className="fas fa-user"></i>,
    isAuthNeeded: true,
  },
  {
    name: "Logout",
    icon: <i className="fas fa-sign-out-alt"></i>,
    isAuthNeeded: true,
  },
];

export { CLIENT_ID, AUTO_LOGOUT_TIME_IN_SECONDS, NAV_ITEMS };
