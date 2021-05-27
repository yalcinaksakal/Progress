import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import Spinner from "../UI/Spinner/Spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function AuthApp({ Component, pageProps }) {
  useEffect(async () => {
    const checkCookie = async () => {
      const result = await fetch("/api/is-logged-in");
      return await result.json();
    };
    const isCookie = await checkCookie();
    console.log(isCookie);
  }, []);
  // http://localhost:3000/#scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkNDliMmFiMTZlMWU5YTQ5NmM4MjM5ZGFjMGRhZGQwOWQ0NDMwMTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzYyMDM0Nzg3Nzc3LTNidjQycDlxc2Rlb2hndnRjZTg3NWFsdDVqdnI1b3BiLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzYyMDM0Nzg3Nzc3LTNidjQycDlxc2Rlb2hndnRjZTg3NWFsdDVqdnI1b3BiLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNDIwMDU2NzUyNDU5Mjk5NDQ5IiwiZW1haWwiOiJocmFuYXJpbWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlhdCI6MTYyMjEzMjY5NSwiZXhwIjoxNjIyMTM2Mjk1LCJqdGkiOiJiMjEzYjkzZmIzNTFkNDQ3MWNjYjA4MmJlZmRhNjFkNzg5M2ZkOTVmIn0.RBBQNplXOOA8Mfn5zW5FglPtP20fId7W3jwWb9WtBWl1zZEBTUX5FcCPVfcvzM6Z4TvuMpaYguZxbN8jCNY3nK8k6sQnn6HhNbZQqmd4lO9Qn0s2880extF6xggc2lhAouCkFvMb_1Xr5h6ypDFxUeI5bp3e8jwOe8SyOOjKuQ3DYJAA86OKFrEuyiPrf8Zrq_svJr-b_wXB2KAFHLnaWvUZk5RGq0M9s5xSpTVPHUy6co8y1YqqcSS2qZ7OFPrnszuurwa4eyGmULMDNWLs_1a6ykH1aKwdyZY8zCJWcAgjcMsDH4Hnmj0zoEOGAhk0v_87AtLpfKcvE4fsXco5iQ&login_hint=AJDLj6JUa8yxXrhHdWRHIV0S13cAWwRQb7yidhjnigTu-j4SSl8aTc7TKnf96PF1EKy_eIq9U1y0TFOg2JbtHCIctwY-2I5rsg&client_id=362034787777-3bv42p9qsdeohgvtce875alt5jvr5opb.apps.googleusercontent.com&prompt=consent
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

          <Layout>
            {isLoading ? <Spinner /> : <Component {...pageProps} />}
          </Layout>
        </>
      )}
    </Provider>
  );
}

export default AuthApp;
