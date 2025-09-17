export interface MovementDB {
  id: string;
  productId: string;
  movementType: string;
  quantity: number;
  userId: string;
  storeId: string;
  date: string;
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

export interface Product {
  id: string;
  name: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
};

export interface Supplier {
  id: string;
  name: string;
};