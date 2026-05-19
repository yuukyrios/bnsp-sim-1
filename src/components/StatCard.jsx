import styles from "./StatCard.module.css";

export default function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
      </div>
      <div className={styles.iconWrap} style={{ background: bg }}>
        <Icon size={20} color={color} />
      </div>
    </div>
  );
}
