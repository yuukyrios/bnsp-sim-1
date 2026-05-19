import { Users } from "lucide-react";
import styles from "./Placeholder.module.css";

export default function Customers() {
  return (
    <div className={styles.wrap}>
      <Users size={48} color="#ccc" />
      <p>Customer management coming soon</p>
    </div>
  );
}
