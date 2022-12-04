import { useRouter } from 'next/router';
import { useEffect } from 'react';
import buttonStyles from '../../components/Button.module.scss';
import { useAuth } from '../../utils/authContext';
import { authFn } from '../../utils/firebase';
import styles from './Login.module.scss';

export default function Login() {
  const router = useRouter();
  const { loading, authUser } = useAuth();

  useEffect(() => {
    if (!loading && authUser) {
      router.push('/dashboard');
    }
  }, [loading, authUser]);

  const handleLogin = async () => {
    authFn();
  };

  return (
    <div className={styles.boxLayout}>
      <div className={styles.box}>
        <h1 className="title">Workouts</h1>
        <p>Easy to use workout tracker</p>
        <button className={buttonStyles.button} onClick={handleLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
}
