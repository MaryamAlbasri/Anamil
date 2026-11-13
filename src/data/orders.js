
export const orders = [
  {
    id: 1,
    learnerId: 1,
    items: [
      {
        productId: 1,
        quantity: 2,
        price: 50
      }
    ],
    total: 100,
    status: "pending",
    paymentStatus: "unpaid",
    orderDate: "2026-11-13"
  }
];

export const getOrderById = (id) => {
  return orders.find(
    (order) => order.id === Number(id)
  );
};

// Supports default imports from the main application.
export default orders;
