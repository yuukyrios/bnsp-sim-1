import { useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import styles from "./Header.module.css";

const TITLES = {
  "/":          "Dashboard",
  "/products":  "Products",
  "/orders":    "Orders",
  "/customers": "Customers",
  "/analytics": "Analytics",
  "/settings":  "Settings",
};

const TODAY = new Intl.DateTimeFormat("en-GB", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
}).format(new Date());

export default function Header({ onMenuClick }) {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div>
          <div className={styles.title}>{TITLES[pathname] ?? "Admin"}</div>
          <div className={styles.date}>{TODAY}</div>
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <Bell size={18} />
          <span className={styles.dot} />
        </button>
        <div className={styles.avatar}>AD</div>
      </div>
    </header>
  );
}
