import { type AppType } from "next/app";
import Layout from "../components/Layout";
import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className='bg-gradient-to-tr from-[#010049] via-[#010049eb] to-[#040263] flex flex-col items-center min-h-screen overflow-hidden px-2'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
};

export default api.withTRPC(MyApp);
