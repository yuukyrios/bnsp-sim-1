import { useProducts } from "../hooks/useProducts";
import { ORDERS } from "../data/orders";
import { fmt, CATEGORY_COLORS } from "../utils/helpers";
import styles from "./Analytics.module.css";

export default function Analytics() {
  const { products } = useProducts();

  const revenue = ORDERS.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);

  const statusCounts = ORDERS.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const categories = [...new Set(products.map((p) => p.category))];
  const catData = categories.map((cat) => ({
    cat,
    count: products.filter((p) => p.category === cat).length,
    revenue: ORDERS
      .filter((o) => products.find((p) => p.name === o.product)?.category === cat)
      .reduce((s, o) => s + o.total, 0),
  }));
  const maxCount = Math.max(...catData.map((d) => d.count));

  const topProducts = [...products]
    .sort((a, b) => {
      const ra = ORDERS.filter((o) => o.product === a.name).reduce((s, o) => s + o.total, 0);
      const rb = ORDERS.filter((o) => o.product === b.name).reduce((s, o) => s + o.total, 0);
      return rb - ra;
    })
    .slice(0, 5);

  return (
    <div className={styles.page}>
      <div className={styles.statsGrid}>
        {[
          { label: "Total Orders",   value: ORDERS.length },
          { label: "Total Revenue",  value: `Rp ${fmt(revenue)}` },
          { label: "Completed",      value: statusCounts.delivered || 0 },
          { label: "Cancelled",      value: statusCounts.cancelled || 0 },
        ].map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statValue}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.grid2}>
        {/* Category breakdown */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Category Distribution</div>
          <div className={styles.barList}>
            {catData.map(({ cat, count }) => {
              const pct = Math.round((count / products.length) * 100);
              return (
                <div key={cat} className={styles.barItem}>
                  <div className={styles.barMeta}>
                    <span className={styles.barLabel}>{cat}</span>
                    <span className={styles.barStat}>{count} products · {pct}%</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${(count / maxCount) * 100}%`,
                        background: CATEGORY_COLORS[cat] || "#533ab7",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order status */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Order Status Breakdown</div>
          <div className={styles.statusList}>
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className={styles.statusItem}>
                <span className={styles.statusLabel}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                <div className={styles.statusBar}>
                  <div
                    className={styles.statusFill}
                    style={{ width: `${(count / ORDERS.length) * 100}%` }}
                  />
                </div>
                <span className={styles.statusCount}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top products */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Top Products by Revenue</div>
        <div className={styles.topList}>
          {topProducts.map((p, i) => {
            const rev = ORDERS.filter((o) => o.product === p.name).reduce((s, o) => s + o.total, 0);
            return (
              <div key={p.id} className={styles.topItem}>
                <div className={styles.topRank}>#{i + 1}</div>
                <div className={styles.topEmoji}>{p.image}</div>
                <div className={styles.topInfo}>
                  <div className={styles.topName}>{p.name}</div>
                  <div className={styles.topCat}>{p.category}</div>
                </div>
                <div className={styles.topRev}>
                  {rev > 0 ? `Rp ${fmt(rev)}` : <span style={{ color: "var(--muted)", fontSize: 13 }}>No orders yet</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
