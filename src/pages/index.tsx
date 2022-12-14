import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingPage from '../components/LoadingPage';
import { useAuth } from '../utils/authContext';

export default function Home() {
  const router = useRouter();
  const { loading, authUser } = useAuth();

  useEffect(() => {
    if (!loading && authUser) {
      router.push('/dashboard');
    } else if (!loading && !authUser) {
      router.push('/login');
    }
  }, [authUser, loading]);

  return (
    <div className="container">
      <Head>
        <title>Workouts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to Workouts!!</h1>
        <LoadingPage />
      </main>

      {
        // TODO remove this and add your own
      }
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>
    </div>
  );
}
