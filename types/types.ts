export interface Movement {
  productId: string;
  movementType: string;
  quantity: number;
  userId: string;
  storeId: string;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
}