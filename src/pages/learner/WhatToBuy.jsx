import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const starterItems = [
  { id: 1, name: "Apron", description: "Protects your clothes from wet clay.", price: 40, shopLink: true, provided: false },
  { id: 2, name: "Small towel", description: "Keeps your hands dry between steps.", price: 15, shopLink: false, provided: false },
  { id: 3, name: "Trimming tool set", description: "Used to shape and trim the base of your cup.", price: 60, shopLink: true, provided: false },
  { id: 4, name: "Natural sponge", description: "Smooths the surface while throwing.", price: 10, shopLink: false, provided: false },
  { id: 5, name: "Clay (2 kg)", description: "Provided by the craftsperson in your first lesson.", price: 0, shopLink: false, provided: true },
];

const STORAGE_KEY = "anamil-starter-checklist";

function WhatToBuy() {
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const toggleItem = (id) => {
    const nextItems = checkedItems.includes(id)
      ? checkedItems.filter((itemId) => itemId !== id)
      : [...checkedItems, id];
    setCheckedItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  };

  const readyCount = starterItems.filter((item) => checkedItems.includes(item.id)).length;
  const progress = (readyCount / starterItems.length) * 100;

  // Items the learner still needs to buy (not checked and not provided)
  const missingTotal = starterItems
    .filter((item) => !checkedItems.includes(item.id) && !item.provided)
    .reduce((sum, item) => sum + item.price, 0);

  const booking = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("pendingBooking") || "null");
    } catch {
      return null;
    }
  })();

  const displayDate = booking?.date
    ? new Date(`${booking.date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "Date to be confirmed";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <Link to="/lessons/1" className="text-sm text-muted hover:text-clay">
            ← Back to lesson
          </Link>

          <h1 className="mt-6 font-serif text-4xl italic text-ink">
            Before your first <span className="text-clay">pottery</span> lesson
          </h1>
          <p className="mt-2 text-sm text-muted">
            Wheel throwing for beginners · {displayDate} with Noura Alqahtani
          </p>

          {/* Progress */}
          <div className="my-6">
            <p className="mb-2 text-sm font-medium text-ink">
              {readyCount} of {starterItems.length} items ready
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-blush">
              <div className="h-full rounded-full bg-clay transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            {starterItems.map((item) => {
              const checked = checkedItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`flex flex-wrap items-center gap-4 rounded-2xl border bg-white p-4 transition ${
                    checked ? "border-clay" : "border-transparent"
                  }`}
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleItem(item.id)}
                      className="h-5 w-5 shrink-0 accent-clay"
                    />
                    <span className="min-w-0">
                      <span className={`block font-medium ${checked ? "text-muted line-through" : "text-ink"}`}>
                        {item.name}
                      </span>
                      <span className="block text-xs text-muted">{item.description}</span>
                    </span>
                  </label>

                  <div className="ml-auto flex items-center gap-3">
                    {item.provided ? (
                      <span className="rounded-full bg-blush px-3 py-1 text-xs text-clay">Provided</span>
                    ) : (
                      <>
                        <span className="text-sm text-ink">~{item.price} SAR</span>
                        {item.shopLink && (
                          <span className="text-xs text-clay" title="Shop link coming soon">
                            View in shop
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-xs text-muted">
            Tick the items you already have. Prices are approximate and set by the craftsperson.
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/cart"
              className="flex-1 rounded-full bg-clay px-5 py-3 text-center font-medium text-white hover:opacity-90"
            >
              Add missing items to cart · {missingTotal} SAR
            </Link>
            <Link
              to="/lessons/1"
              className="flex-1 rounded-full border border-ink px-5 py-3 text-center font-medium text-ink hover:bg-white"
            >
              Back to lesson details
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default WhatToBuy;