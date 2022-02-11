import "../styles/globals.css";
import { Header, ScrollToTop } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <ScrollToTop showBelow={250} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
