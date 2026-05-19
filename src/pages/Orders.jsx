import { useState } from "react";
import { ORDERS } from "../data/orders";
import { fmt, ORDER_STATUS_STYLE } from "../utils/helpers";
import styles from "./Orders.module.css";

const ALL_STATUSES = ["All", "delivered", "shipped", "processing", "pending", "cancelled"];

export default function Orders() {
  const [filter, setFilter] = useState("All");

  const list = filter === "All" ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <div className={styles.page}>
      <div className={styles.filters}>
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            className={`${styles.filterBtn} ${filter === s ? styles.active : ""}`}
            onClick={() => setFilter(s)}
          >
            {s === "All" ? "All Orders" : s.charAt(0).toUpperCase() + s.slice(1)}
            <span className={styles.count}>
              {s === "All" ? ORDERS.length : ORDERS.filter((o) => o.status === s).length}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {["Order ID", "Customer", "Product", "Qty", "Total", "Status", "Date"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr><td colSpan={7} className={styles.empty}>No orders in this category</td></tr>
              )}
              {list.map((o) => {
                const st = ORDER_STATUS_STYLE[o.status];
                return (
                  <tr key={o.id} className="tr-hover">
                    <td><span className={styles.orderId}>{o.id}</span></td>
                    <td>{o.customer}</td>
                    <td className={styles.product}>{o.product}</td>
                    <td>{o.qty}</td>
                    <td><strong>Rp {fmt(o.total)}</strong></td>
                    <td>
                      <span className="tag" style={{ background: st.bg, color: st.color }}>
                        {o.status}
                      </span>
                    </td>
                    <td className={styles.date}>{o.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.footer}>Showing {list.length} orders</div>
      </div>
    </div>
  );
}
