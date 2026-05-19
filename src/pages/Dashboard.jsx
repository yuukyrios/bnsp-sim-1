import { useNavigate } from "react-router-dom";
import { DollarSign, Package, AlertTriangle, PackageX } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { ORDERS } from "../data/orders";
import StatCard from "../components/StatCard";
import { fmt, getProductStatus, ORDER_STATUS_STYLE } from "../utils/helpers";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { products } = useProducts();
  const navigate = useNavigate();

  const totalRevenue = ORDERS
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);

  const stats = [
    {
      label: "Total Revenue",
      value: `Rp ${fmt(totalRevenue)}`,
      icon: DollarSign,
      color: "#533ab7", bg: "#eeedfe",
    },
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "#0e7a5a", bg: "#edfaf4",
    },
    {
      label: "Low Stock",
      value: products.filter((p) => p.stock > 0 && p.stock < 5).length,
      icon: AlertTriangle,
      color: "#c47a1a", bg: "#fff8ec",
    },
    {
      label: "Unavailable",
      value: products.filter((p) => p.stock === 0).length,
      icon: PackageX,
      color: "#e24b4a", bg: "#fff1f1",
    },
  ];

  const alerts = products.filter((p) => p.stock < 5);

  return (
    <div className={styles.page}>
      <div className={styles.statsGrid}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className={styles.grid2}>
        {/* Recent orders */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>Recent Orders</span>
            <button className={styles.viewAll} onClick={() => navigate("/orders")}>
              View all →
            </button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {["Order ID", "Customer", "Total", "Status"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDERS.slice(0, 6).map((o) => {
                  const st = ORDER_STATUS_STYLE[o.status];
                  return (
                    <tr key={o.id} className="tr-hover">
                      <td><span className={styles.orderId}>{o.id}</span></td>
                      <td>{o.customer}</td>
                      <td><strong>Rp {fmt(o.total)}</strong></td>
                      <td>
                        <span className="tag" style={{ background: st.bg, color: st.color }}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock alerts */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>Stock Alerts</span>
            <span className={styles.badge}>{alerts.length}</span>
          </div>
          <div className={styles.alertList}>
            {alerts.length === 0 && (
              <p className={styles.empty}>All products sufficiently stocked 🎉</p>
            )}
            {alerts.map((p) => {
              const s = getProductStatus(p.stock);
              return (
                <div key={p.id} className={styles.alertItem}>
                  <div className={styles.alertEmoji}>{p.image}</div>
                  <div className={styles.alertInfo}>
                    <div className={styles.alertName}>{p.name}</div>
                    <div className={styles.alertCat}>{p.category}</div>
                  </div>
                  <span className="tag" style={{ background: s.bg, color: s.color }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
