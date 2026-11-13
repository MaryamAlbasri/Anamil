
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Tag from "../components/Tag";

// AI Assistance: ChatGPT helped implement product management,
// including form validation, photo previews, editing,
// and mock product inventory.

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
};

export default function Products() {
  const [form, setForm] = useState({ ...emptyForm });
  const [photos, setPhotos] = useState([]);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  async function handlePhotos(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (photos.length + files.length > 5) {
      setErrors((previous) => ({
        ...previous,
        photos: "You can upload up to 5 photos.",
      }));
      return;
    }

    const invalid = files.some(
        (file) =>
            !["image/jpeg", "image/png"].includes(file.type) ||
            file.size > 5 * 1024 * 1024
    );

    if (invalid) {
      setErrors((previous) => ({
        ...previous,
        photos: "Only JPG or PNG images up to 5 MB are allowed. ",
      }));
      return;
    }

    try {
      const previews = await Promise.all(
          files.map(
              (file) =>
                  new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () =>
                        resolve({
                          id: crypto.randomUUID(),
                          name: file.name,
                          src: reader.result,
                        });

                    reader.onerror = () =>
                        reject(new Error("Unable to read image."));

                    reader.readAsDataURL(file);
                  })
          )
      );

      setPhotos((previous) => [...previous, ...previews]);
      setErrors((previous) => ({ ...previous, photos: "" }));
    } catch {
      setErrors((previous) => ({
        ...previous,
        photos: "Could not load the selected images.",
      }));
    }
  }

  function removePhoto(id) {
    setPhotos((previous) =>
        previous.filter((photo) => photo.id !== id)
    );
  }

  function resetForm() {
    setForm({ ...emptyForm });
    setPhotos([]);
    setErrors({});
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (
        form.price.trim() === "" ||
        !Number.isFinite(price) ||
        price <= 0
    ) {
      newErrors.price = "Price must be greater than 0.";
    }

    if (
        form.stock.trim() === "" ||
        !Number.isInteger(stock) ||
        stock < 0
    ) {
      newErrors.stock = "Stock must be 0 or more.";
    }

    if (photos.length === 0) {
      newErrors.photos = "Add at least one product photo.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const product = {
      id: editingId ?? crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      stock,
      photos: [...photos],
    };

    if (editingId !== null) {
      setProducts((previous) =>
          previous.map((item) =>
              item.id === editingId ? product : item
          )
      );
      setMessage("Product updated successfully!");
    } else {
      setProducts((previous) => [...previous, product]);
      setMessage("Product added successfully!");
    }

    resetForm();
  }

  function editProduct(product) {
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
    });

    setPhotos([...product.photos]);
    setEditingId(product.id);
    setErrors({});
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteProduct(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setProducts((previous) =>
        previous.filter((product) => product.id !== id)
    );

    if (editingId === id) resetForm();

    setMessage("Product deleted successfully.");
  }

  return (
      <main className="min-h-screen bg-cream px-4 py-10 text-ink">
        <div className="mx-auto max-w-4xl space-y-8">

          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h1 className="font-serif text-4xl text-clay">
              {editingId !== null ? "Edit Product" : "Add Product"}
            </h1>

            <p className="mb-8 mt-2 text-sm text-muted">
              Showcase and manage your handmade products.
            </p>

            {message && (
                <p role="status" className="mb-5 rounded-lg bg-blush p-3">
                  {message}
                </p>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <Input
                  label="Product name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Handmade Pottery Vase"
                  error={errors.name}
                  required
              />

              <div className="space-y-2">
                <label htmlFor="description" className="anamil-input-label">
                  Description *
                </label>

                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your handmade product..."
                    rows={4}
                    className="anamil-input"
                />

                {errors.description && (
                    <p className="anamil-error-message">
                      {errors.description}
                    </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                    label="Price (SAR)"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                    error={errors.price}
                    required
                />

                <Input
                    label="Stock quantity"
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="e.g. 10"
                    error={errors.stock}
                    required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="productPhotos" className="anamil-input-label">
                  Product photos *
                </label>

                <input
                    id="productPhotos"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={handlePhotos}
                    className="block w-full rounded-lg border border-gray-300 p-3 text-sm"
                />

                <p className="text-xs text-muted">
                  JPG or PNG, up to 5 photos, maximum 5 MB each.
                </p>

                {errors.photos && (
                    <p role="alert" className="anamil-error-message">
                      {errors.photos}
                    </p>
                )}

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {photos.map((photo) => (
                      <div key={photo.id} className="rounded-lg border p-2">
                        <img
                            src={photo.src}
                            alt={photo.name}
                            className="h-28 w-full rounded object-cover"
                        />

                        <button
                            type="button"
                            onClick={() => removePhoto(photo.id)}
                            className="mt-2 text-sm text-red-600 underline"
                        >
                          Remove
                        </button>
                      </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit">
                  {editingId !== null ? "Save Changes" : "Add Product"}
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-5 text-2xl font-semibold">
              My Products
            </h2>

            {products.length === 0 && (
                <p className="text-muted">
                  No products added yet.
                </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {products.map((product) => (
                  <article
                      key={product.id}
                      className="overflow-hidden rounded-xl border border-gray-200"
                  >
                    <img
                        src={product.photos[0]?.src}
                        alt={product.name}
                        className="h-48 w-full object-cover"
                    />

                    <div className="space-y-3 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold">
                          {product.name}
                        </h3>

                        <Tag variant={product.stock === 0 ? "danger" : "success"}>
                          {product.stock === 0 ? "Sold out" : "In stock"}
                        </Tag>
                      </div>

                      <p className="text-sm text-muted">
                        {product.description}
                      </p>

                      <p className="font-semibold text-clay">
                        {product.price} SAR
                      </p>

                      <p className="text-sm">
                        Stock: {product.stock}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => editProduct(product)}
                        >
                          Edit
                        </Button>

                        <button
                            type="button"
                            onClick={() => deleteProduct(product.id)}
                            className="text-sm text-red-600 underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
              ))}
            </div>
          </section>
        </div>
      </main>
  );
}
