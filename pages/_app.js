import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import Spinner from "../UI/Spinner/Spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function AuthApp({ Component, pageProps }) {
  const [silentLogin, setSilentLogin] = useState({
    loading: false,
    result: {},
  });

  useEffect(async () => {
    console.log("renderind app");
    const checkCookie = async () => {
      const result = await fetch("/api/is-logged-in");
      return await result.json();
    };
    setSilentLogin({
      loading: true,
      result: {},
    });
    const isCookie = await checkCookie();
    setSilentLogin({ loading: false, result: { ...isCookie } });
  }, []);


  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isAuthPage = router.pathname === "/auth";
  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Provider store={store}>
      {isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Head>
            <title>Progress</title>

            <link rel="icon" href="/p2.png" />
            <meta
              name="description"
              content="Progress platform - Online learning, meeting, therapy, coaching platform. "
            />
          </Head>

          <Layout silentLogin={silentLogin}>
            {isLoading ? <Spinner /> : <Component {...pageProps} />}
          </Layout>
        </>
      )}
    </Provider>
  );
}

export default AuthApp;
