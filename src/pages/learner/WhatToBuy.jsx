
import { useState } from "react";
import Card from "../../components/Card";

const starterItems = [
  {
    id: 1,
    name: "Apron",
    description: "Protects your clothes from wet clay.",
    price: 40,
    shopLink: true,
    provided: false
  },
  {
    id: 2,
    name: "Small towel",
    description: "Keeps your hands dry between steps.",
    price: 15,
    shopLink: false,
    provided: false
  },
  {
    id: 3,
    name: "Trimming tool set",
    description: "Used to shape and trim the base of your cup.",
    price: 60,
    shopLink: true,
    provided: false
  },
  {
    id: 4,
    name: "Natural sponge",
    description: "Smooths the surface while throwing.",
    price: 10,
    shopLink: false,
    provided: false
  },
  {
    id: 5,
    name: "Clay (2 kg)",
    description: "Provided by the craftsperson in your first lesson.",
    price: 0,
    shopLink: false,
    provided: true
  }
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

  const readyCount = starterItems.filter(
    (item) => checkedItems.includes(item.id)
  ).length;

  const progress = (readyCount / starterItems.length) * 100;

  const booking = (() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("pendingBooking") || "null"
      );
    } catch {
      return null;
    }
  })();

  const displayDate = booking?.date
    ? new Date(`${booking.date}T12:00:00`).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      )
    : "Date to be confirmed";

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <main className="mx-auto max-w-3xl">
        <a
          href="/lessons/1"
          className="text-sm text-muted underline"
        >
          ← Back to lesson
        </a>

        <h1 className="mt-6 text-3xl font-bold">
          Before your first pottery lesson
        </h1>

        <p className="mt-2 text-sm text-muted">
          Wheel throwing for beginners · {displayDate}
          {" "}with Noura Alqahtani
        </p>

        <div className="mt-6 mb-6">
          <p className="mb-2 text-sm font-medium">
            {readyCount} of {starterItems.length} items ready
          </p>

          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-clay transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card>
          <div className="space-y-3">
            {starterItems.map((item) => {
              const checked = checkedItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleItem(item.id)}
                      className="h-4 w-4 shrink-0 accent-black"
                    />

                    <span className="min-w-0">
                      <span className="block font-medium">
                        {item.name}
                      </span>

                      <span className="block text-xs text-muted">
                        {item.description}
                      </span>
                    </span>
                  </label>

                  <div className="ml-auto flex items-center gap-3">
                    {item.provided ? (
                      <>
                        <span className="text-xs text-muted">
                          Included
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                          Provided
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm text-muted">
                          ~{item.price} SAR
                        </span>

                        {item.shopLink && (
                          <span
                            className="text-xs text-muted underline"
                            title="Shop link coming soon"
                          >
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
        </Card>

        <p className="mt-5 text-xs text-muted">
          Approximate prices are set by the craftsperson.
          Items marked Provided are included in the lesson.
          Shop links will be connected when product pages
          are available.
        </p>

        <a
          href="/lessons/1"
          className="mt-7 block rounded-lg bg-clay px-5 py-3 text-center font-medium text-white hover:bg-gray-800"
        >
          Back to Lesson Details
        </a>
      </main>
    </div>
  );
}

export default WhatToBuy;

