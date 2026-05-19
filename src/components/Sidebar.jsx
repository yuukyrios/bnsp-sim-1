import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  BarChart2, Settings, Zap, X,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const NAV = [
  { to: "/",          icon: LayoutDashboard, label: "Dashboard"  },
  { to: "/products",  icon: Package,         label: "Products"   },
  { to: "/orders",    icon: ShoppingCart,    label: "Orders"     },
  { to: "/customers", icon: Users,           label: "Customers"  },
  { to: "/analytics", icon: BarChart2,       label: "Analytics"  },
  { to: "/settings",  icon: Settings,        label: "Settings"   },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><Zap size={18} /></div>
          <div>
            <div className={styles.logoName}>GundamShop</div>
            <div className={styles.logoSub}>Admin Panel</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        <nav className={styles.nav}>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.userBlock}>
          <div className={styles.avatar}>AD</div>
          <div>
            <div className={styles.userName}>Admin</div>
            <div className={styles.userRole}>Super Admin</div>
          </div>
        </div>
      </aside>
    </>
  );
}
