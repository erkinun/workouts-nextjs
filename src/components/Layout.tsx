import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const { pathname } = router;

  if (pathname === '/login') {
    return <>{children}</>;
  } else {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }
}
