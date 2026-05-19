import { useState } from "react";
import { CATEGORIES } from "../data/products";
import styles from "./ProductForm.module.css";

const EMPTY = { name: "", category: "High Grade", price: "", stock: "" };

export default function ProductForm({ initial = EMPTY, onSubmit, onCancel, submitLabel = "Save" }) {
  const [form, setForm] = useState(initial);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: parseInt(form.price) || 0,
      stock: parseInt(form.stock) || 0,
    });
  };

  const valid = form.name.trim() !== "" && form.price !== "" && form.stock !== "";

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>Product Name</label>
        <input value={form.name} onChange={set("name")} placeholder="e.g. HG Freedom Gundam" required />
      </div>
      <div className={styles.field}>
        <label>Category</label>
        <select value={form.category} onChange={set("category")}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Price (IDR)</label>
          <input type="number" value={form.price} onChange={set("price")} placeholder="400000" min={0} required />
        </div>
        <div className={styles.field}>
          <label>Stock</label>
          <input type="number" value={form.stock} onChange={set("stock")} placeholder="0" min={0} required />
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button>
        <button type="submit" className={styles.submit} disabled={!valid}>{submitLabel}</button>
      </div>
    </form>
  );
}
