import '@/styles/globals.css'
import TopNav from '../components/TopNav'

export default function App({ Component, pageProps }) {
  
  return (
    <>
      <TopNav/>
      <Component {...pageProps} />
    </>
  )
}
