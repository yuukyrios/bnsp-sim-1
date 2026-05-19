import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "./Layout.module.css";

export default function Layout() {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className={styles.root}>
      <Sidebar open={sideOpen} onClose={() => setSideOpen(false)} />
      <div className={styles.main}>
        <Header onMenuClick={() => setSideOpen((o) => !o)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
