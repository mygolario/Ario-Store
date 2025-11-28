export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus =
  | "در حال پردازش"
  | "ارسال شده"
  | "تحویل شده"
  | "لغو شده";

export interface Order {
  id: string;
  createdAt: string; // ISO date string
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  shippingMethod: string;
  shippingAddress: {
    city: string;
    address: string;
    postalCode: string;
  };
}

export const mockOrders: Order[] = [
  {
    id: "ARIO-2025-0001",
    createdAt: "2025-01-10T14:30:00Z",
    status: "تحویل شده",
    totalAmount: 15990000,
    items: [
      {
        productId: "1",
        quantity: 1,
        unitPrice: 15990000,
      },
    ],
    shippingMethod: "ارسال سریع",
    shippingAddress: {
      city: "تهران",
      address: "خیابان ولیعصر، پلاک 123",
      postalCode: "1234567890",
    },
  },
  {
    id: "ARIO-2025-0002",
    createdAt: "2025-01-08T09:15:00Z",
    status: "ارسال شده",
    totalAmount: 24990000,
    items: [
      {
        productId: "2",
        quantity: 1,
        unitPrice: 12990000,
      },
      {
        productId: "5",
        quantity: 1,
        unitPrice: 8990000,
      },
      {
        productId: "13",
        quantity: 1,
        unitPrice: 2990000,
      },
    ],
    shippingMethod: "ارسال عادی",
    shippingAddress: {
      city: "تهران",
      address: "خیابان ولیعصر، پلاک 123",
      postalCode: "1234567890",
    },
  },
  {
    id: "ARIO-2025-0003",
    createdAt: "2025-01-05T16:45:00Z",
    status: "در حال پردازش",
    totalAmount: 19990000,
    items: [
      {
        productId: "9",
        quantity: 1,
        unitPrice: 19990000,
      },
    ],
    shippingMethod: "ارسال سریع",
    shippingAddress: {
      city: "تهران",
      address: "خیابان ولیعصر، پلاک 123",
      postalCode: "1234567890",
    },
  },
  {
    id: "ARIO-2024-0042",
    createdAt: "2024-12-20T11:20:00Z",
    status: "تحویل شده",
    totalAmount: 8990000,
    items: [
      {
        productId: "6",
        quantity: 1,
        unitPrice: 3990000,
      },
      {
        productId: "12",
        quantity: 1,
        unitPrice: 8990000,
      },
    ],
    shippingMethod: "ارسال عادی",
    shippingAddress: {
      city: "تهران",
      address: "خیابان ولیعصر، پلاک 123",
      postalCode: "1234567890",
    },
  },
];

export function getAllOrders(): Order[] {
  return mockOrders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((order) => order.id === id);
}

export function getOrdersByStatus(status: OrderStatus): Order[] {
  return mockOrders.filter((order) => order.status === status);
}

