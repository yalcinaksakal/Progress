import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import Spinner from "../UI/Spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function AuthApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
      <Head>
        <title>Progress</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
        />
        <link rel="icon" href="/logo.png" />
        <meta
          name="description"
          content="Progress platform - Online learning, meeting, therapy, coaching platform. "
        />
      </Head>

      <Layout>{isLoading ? <Spinner /> : <Component {...pageProps} />}</Layout>
    </Provider>
  );
}

export default AuthApp;
