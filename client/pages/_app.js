import '@/styles/globals.css';
import TopNav from '@/components/TopNav';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from '@/context';

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position="top-right" />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}
