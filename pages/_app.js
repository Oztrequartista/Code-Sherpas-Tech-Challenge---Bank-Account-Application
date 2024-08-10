import "@/assets/scss/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import "remixicon/fonts/remixicon.css";
import dynamic from "next/dynamic";
const AuthenticatedLayout = dynamic(
  () => import("@/shared/layouts/authenticated-layout"),
  { ssr: false },
);

import { TransactionProvider } from "@/context/transaction-context";
import { Roboto } from "next/font/google";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const layouts = {
  AuthenticatedLayout,
};

function App({ Component, pageProps }) {
  const Layout =
    layouts[Component.layout] ||
    ((pageProps) => <Component>{pageProps}</Component>);

  return (
    <div className={roboto.className}>
      <TransactionProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
      </TransactionProvider>
    </div>
  );
}

export default App;
