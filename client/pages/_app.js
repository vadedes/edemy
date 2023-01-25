import '@/styles/globals.css';
import TopNav from '../components/TopNav';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-right" />
      <TopNav />
      <Component {...pageProps} />
    </>
  );
}
