export interface MovementDB {
  productId: string;
  movementType: string;
  quantity: number;
  userId: string;
  storeId: string;
}

export interface MovementTable {
  productId: string;
  productName: string;
  movementType: string;
  quantity: number;
  userName: string;
  date: string;
  storeId?: string;
}

export type UserBD = {
  name: string;
  email: string;
  password: string;
  storeId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string | null;
};

export interface Product {
  id: string;
  name?: string;
  quantity: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
};

export interface Supplier {
  id: string;
  name: string;
};