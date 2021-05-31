import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import Spinner from "../UI/Spinner/Spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function AuthApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const { events } = useRouter();


  // while navigating between pages show spinner
  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);
    events.on("routeChangeStart", start);
    events.on("routeChangeComplete", end);
    events.on("routeChangeError", end);
    return () => {
      events.off("routeChangeStart", start);
      events.off("routeChangeComplete", end);
      events.off("routeChangeError", end);
    };
  }, [events]);

  return (
    <Provider store={store}>
      <>
        <Head>
          <title>Progress</title>
          <link rel="icon" href="/p2.png" />
          <meta
            name="description"
            content="Progress platform - Online learning, meeting, therapy, coaching platform. "
          />
        </Head>
        <Layout>
          {isLoading ? (
            <section>
              <Spinner />
            </section>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </>
    </Provider>
  );
}

export default AuthApp;
