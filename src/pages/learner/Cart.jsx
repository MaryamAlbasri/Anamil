
import { useState } from "react";

const CART_KEY = "anamil-cart";
const CHECKOUT_KEY = "anamil-checkout";

const sampleProducts = [
  {
    id: 101,
    name: "Trimming tool set",
    craftsperson: "Noura Alqahtani",
    price: 60,
    quantity: 1,
    stock: 5
  },
  {
    id: 102,
    name: "Apron",
    craftsperson: "Noura Alqahtani",
    price: 40,
    quantity: 2,
    stock: 2
  }
];

const addressFields = [
  { key: "city", label: "City" },
  { key: "district", label: "District" },
  { key: "street", label: "Street" },
  { key: "building", label: "Building no." }
];

function Cart() {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY));

      if (!Array.isArray(saved)) return sampleProducts;

      const oldDemo = saved.some(
        (item) => item.id === 1 || item.id === 2
      );

      return oldDemo ? sampleProducts : saved;
    } catch {
      return sampleProducts;
    }
  });

  const [deliveryMethod, setDeliveryMethod] =
    useState("delivery");

  const [address, setAddress] = useState({
    city: "Riyadh",
    district: "Al Malqa",
    street: "Anas Bin Malik Rd",
    building: "4521"
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [stockWarnings, setStockWarnings] = useState({});
  const [generalError, setGeneralError] = useState("");

  const updateCart = (updated) => {
    setItems(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  };

  const changeQuantity = (id, amount) => {
    const updated = items.map((item) => {
      if (item.id !== id) return item;

      const nextQuantity = Math.max(
        1,
        Math.min(item.stock, item.quantity + amount)
      );

      return { ...item, quantity: nextQuantity };
    });

    updateCart(updated);
    setGeneralError("");
  };

  const removeItem = (id) => {
    updateCart(items.filter((item) => item.id !== id));

    setStockWarnings((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping =
    items.length > 0 && deliveryMethod === "delivery"
      ? 25
      : 0;

  const total = subtotal + shipping;

  const updateAddress = (field, value) => {
    setAddress((previous) => ({
      ...previous,
      [field]: value
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [field]: ""
    }));
  };

  const handleCheckout = () => {
    setGeneralError("");

    if (items.length === 0) {
      setGeneralError("Your cart is empty.");
      return;
    }

    // Demo: stock changes before checkout.
    const updatedItems = items.map((item) => {
      const availableStock =
        item.id === 102 ? 1 : item.stock;

      return {
        ...item,
        stock: availableStock,
        quantity: Math.min(
          item.quantity,
          availableStock
        )
      };
    });

    const warnings = {};

    items.forEach((item, index) => {
      if (item.quantity > updatedItems[index].quantity) {
        warnings[item.id] =
          `Only ${updatedItems[index].stock} left in stock. Quantity changed to ${updatedItems[index].quantity}.`;
      }
    });

    if (Object.keys(warnings).length > 0) {
      setStockWarnings(warnings);
      updateCart(updatedItems);
    }

    const errors = {};

    if (deliveryMethod === "delivery") {
      addressFields.forEach(({ key, label }) => {
        if (!address[key].trim()) {
          errors[key] = `${label} is required`;
        }
      });
    }

    setFieldErrors(errors);

    if (
      Object.keys(warnings).length > 0 ||
      Object.keys(errors).length > 0
    ) {
      return;
    }

    const updatedSubtotal = updatedItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    const updatedShipping =
      deliveryMethod === "delivery" ? 25 : 0;

    const order = {
      items: updatedItems,
      deliveryMethod,
      address:
        deliveryMethod === "delivery" ? address : null,
      subtotal: updatedSubtotal,
      shipping: updatedShipping,
      total: updatedSubtotal + updatedShipping
    };

    sessionStorage.setItem(
      "pendingOrder",
      JSON.stringify(order)
    );

    sessionStorage.setItem(
      CHECKOUT_KEY,
      JSON.stringify(order)
    );

    window.location.href = "/checkout/payment";
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-7 text-3xl font-bold">
          Your cart
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <section className="space-y-4 lg:col-span-2">
            {items.length === 0 ? (
              <div className="rounded-xl border bg-white p-8 text-center">
                <h2 className="text-xl font-semibold">
                  Your cart is empty
                </h2>
              </div>
            ) : (
              items.map((item) => (
                <article
                  key={item.id}
                  className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white p-5 ${
                    stockWarnings[item.id]
                      ? "border-red-400"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                      Product
                    </div>

                    <div>
                      <h2 className="font-semibold">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Sold by {item.craftsperson}
                      </p>

                      {stockWarnings[item.id] && (
                        <p
                          role="alert"
                          className="mt-2 text-sm text-red-600"
                        >
                          {stockWarnings[item.id]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-lg border">
                      <button
                        type="button"
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-3 py-2 disabled:opacity-30"
                      >
                        −
                      </button>

                      <span className="min-w-7 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                        disabled={item.quantity >= item.stock}
                        className="px-3 py-2 disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-medium">
                      {item.price} SAR
                    </span>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>

          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Delivery method
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: "pickup",
                  label: "Pickup from craftsperson",
                  description: "Free · Al Olaya, Riyadh"
                },
                {
                  id: "delivery",
                  label: "Delivery",
                  description: "25 SAR · 2–4 days"
                }
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border p-3"
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === method.id}
                    onChange={() => {
                      setDeliveryMethod(method.id);
                      setFieldErrors({});
                    }}
                    className="mt-1 accent-black"
                  />

                  <span>
                    <span className="block font-medium">
                      {method.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {method.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            {deliveryMethod === "delivery" && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold">
                  Delivery address
                </h3>

                {addressFields.map(({ key, label }) => (
                  <label key={key} className="block text-sm">
                    <span className="mb-1 block font-medium">
                      {label}
                    </span>

                    <input
                      type="text"
                      value={address[key]}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      onChange={(event) =>
                        updateAddress(
                          key,
                          event.target.value
                        )
                      }
                      className={`w-full rounded-lg border p-3 ${
                        fieldErrors[key]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />

                    {fieldErrors[key] && (
                      <span className="mt-1 block text-xs text-red-600">
                        {fieldErrors[key]}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-3 border-t pt-5 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal} SAR</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{shipping} SAR</span>
              </div>

              <div className="flex justify-between border-t pt-3 text-lg font-bold">
                <span>Total</span>
                <span>{total} SAR</span>
              </div>
            </div>

            {generalError && (
              <p className="mt-4 text-sm text-red-600">
                {generalError}
              </p>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="mt-5 w-full rounded-lg bg-black px-5 py-3 font-medium text-white disabled:opacity-50"
            >
              Continue to payment
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              You'll pay securely on the next step.
              Demo only — no real payment.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
