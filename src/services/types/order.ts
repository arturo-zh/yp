export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type TData = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}