import { useState } from "react";
import styles from "./Settings.module.css";

const INITIAL = {
  storeName: "GundamShop",
  email: "admin@gundamshop.id",
  currency: "IDR (Rp)",
  lowStockThreshold: "5",
  timezone: "Asia/Jakarta",
};

export default function Settings() {
  const [form, setForm]   = useState(INITIAL);
  const [saved, setSaved] = useState(false);

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setSaved(false); };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSave}>
        <h2 className={styles.section}>Store Information</h2>
        {[
          { label: "Store Name",  key: "storeName",  type: "text"   },
          { label: "Email",       key: "email",      type: "email"  },
          { label: "Currency",    key: "currency",   type: "text"   },
          { label: "Timezone",    key: "timezone",   type: "text"   },
        ].map(({ label, key, type }) => (
          <div key={key} className={styles.field}>
            <label>{label}</label>
            <input type={type} value={form[key]} onChange={set(key)} />
          </div>
        ))}

        <h2 className={styles.section} style={{ marginTop: "1.5rem" }}>Inventory Settings</h2>
        <div className={styles.field}>
          <label>Low Stock Threshold</label>
          <input type="number" min={1} value={form.lowStockThreshold} onChange={set("lowStockThreshold")} style={{ maxWidth: 120 }} />
          <span className={styles.hint}>Products with stock below this value are flagged as "Low Stock"</span>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.saveBtn}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
