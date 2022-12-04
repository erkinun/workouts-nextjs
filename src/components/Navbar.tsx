import * as React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import buttonStyles from './Button.module.scss';
import { useRouter } from 'next/router';
import { logOut } from '../utils/firebase';

// TODO show which page we are on by making the link bolder
// TODO remove the component button
// TODO better styling for mobile with possible burger menu
export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.content}>
        <div className={styles.navigation}>
          <Link href="/dashboard">
            <a href="/dashboard">
              <h1 className={styles.title}>Workouts</h1>
            </a>
          </Link>
          <Link href="/workouts/add">
            <a href="/workouts/add">
              <h3 className={styles.section}>Log Workout</h3>
            </a>
          </Link>
          <Link href="/routines">
            <a href="/routines">
              <h3 className={styles.section}>Routines</h3>
            </a>
          </Link>
        </div>
        <button className={buttonStyles.link} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}
