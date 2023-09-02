import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import LoginModal from "@/components/LoginModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LoginModal />
      <Component {...pageProps} />
    </Provider>
  );
}
