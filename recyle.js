const dispatch = useDispatch();
const router = useRouter();

const { isLoggedIn, remainingTime } = useSelector(state => state.auth);
useEffect(() => {
  const { initialToken, expirationTime, userName, loginType } =
    retriveStoredToken();
  if (initialToken) {
    dispatch(
      authActions.login({
        token: initialToken,
        expirationTime,
        userName,
        loginType,
      })
    );
    const remainingTime = calculateRemainingTime(expirationTime);
    dispatch(setLogoutTimer(remainingTime));
  }
  // else router.replace("/auth");
}, [dispatch, retriveStoredToken, calculateRemainingTime]);

const logoutHanler = () => {
  dispatch(authActions.logout());
  clearLogoutTimer();
  // router.replace("/auth");
};