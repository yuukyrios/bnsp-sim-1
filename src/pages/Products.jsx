import { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { CATEGORIES } from "../data/products";
import { fmt, getProductStatus } from "../utils/helpers";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import styles from "./Products.module.css";

const STATUS_OPTS = ["All", "Ready", "Low Stock", "Unavailable"];
const SORT_OPTS = [
  { value: "name",  label: "Sort: Name"  },
  { value: "price", label: "Sort: Price" },
  { value: "stock", label: "Sort: Stock" },
];

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [search,   setSearch]   = useState("");
  const [cat,      setCat]      = useState("All");
  const [status,   setStatus]   = useState("All");
  const [sort,     setSort]     = useState("name");
  const [adding,   setAdding]   = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    let list = products;
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    if (status !== "All") list = list.filter((p) => getProductStatus(p.stock).label === status);
    return [...list].sort((a, b) => {
      if (sort === "price") return b.price - a.price;
      if (sort === "stock") return b.stock - a.stock;
      return a.name.localeCompare(b.name);
    });
  }, [products, search, cat, status, sort]);

  const handleAdd    = (data) => { addProduct(data); setAdding(false); };
  const handleUpdate = (data) => { updateProduct({ ...editing, ...data }); setEditing(null); };
  const handleDelete = () => { deleteProduct(deleting.id); setDeleting(null); };

  return (
    <div className={styles.page}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
          />
        </div>

        <select className={styles.select} value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUS_OPTS.map((s) => <option key={s}>{s}</option>)}
        </select>

        <select className={styles.select} value={sort} onChange={(e) => setSort(e.target.value)}>
          {SORT_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <button className={styles.addBtn} onClick={() => setAdding(true)}>
          <Plus size={15} /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {["Product", "Category", "Price (IDR)", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.empty}>No products found</td>
                </tr>
              )}
              {filtered.map((p) => {
                const s = getProductStatus(p.stock);
                return (
                  <tr key={p.id} className="tr-hover">
                    <td>
                      <div className={styles.productCell}>
                        <div className={styles.productEmoji}>{p.image}</div>
                        <span className={styles.productName}>{p.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.catTag}>{p.category}</span>
                    </td>
                    <td className={styles.price}>Rp {fmt(p.price)}</td>
                    <td>{p.stock}</td>
                    <td>
                      <span className="tag" style={{ background: s.bg, color: s.color }}>
                        {s.label}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.editBtn}
                          title="Edit"
                          onClick={() => setEditing(p)}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          className={styles.deleteBtn}
                          title="Delete"
                          onClick={() => setDeleting(p)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.footer}>
          Showing {filtered.length} of {products.length} products
        </div>
      </div>

      {/* Add modal */}
      {adding && (
        <Modal title="Add New Product" onClose={() => setAdding(false)}>
          <ProductForm onSubmit={handleAdd} onCancel={() => setAdding(false)} submitLabel="Add Product" />
        </Modal>
      )}

      {/* Edit modal */}
      {editing && (
        <Modal title="Edit Product" onClose={() => setEditing(null)}>
          <ProductForm
            initial={{ name: editing.name, category: editing.category, price: editing.price, stock: editing.stock }}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
            submitLabel="Save Changes"
          />
        </Modal>
      )}

      {/* Delete confirm modal */}
      {deleting && (
        <Modal title="Delete Product" onClose={() => setDeleting(null)}>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: "1.5rem" }}>
            Are you sure you want to delete <strong style={{ color: "var(--dark)" }}>{deleting.name}</strong>? This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button className={styles.cancelConfirm} onClick={() => setDeleting(null)}>Cancel</button>
            <button className={styles.deleteConfirm} onClick={handleDelete}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
