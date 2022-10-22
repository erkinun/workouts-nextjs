import * as React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import buttonStyles from "./Button.module.scss";
// TODO handle the logout action
// TODO show which page we are on by making the link bolder
// TODO remove the component button
// TODO better styling for mobile with possible burger menu
export default function Navbar({ logout }: any) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.navigation}>
          <Link href="/dashboard">
            <a>
              <h1 className={styles.title}>Workouts</h1>
            </a>
          </Link>
          <Link href="/workouts/add">
            <a>
              <h3 className={styles.section}>Log Workout</h3>
            </a>
          </Link>
          <Link href="/routines">
            <a>
              <h3 className={styles.section}>Routines</h3>
            </a>
          </Link>
        </div>
        <button className={buttonStyles.link} onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
