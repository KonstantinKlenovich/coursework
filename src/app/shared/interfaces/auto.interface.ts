export interface AutoNotId {
  brand: string;
  description: string;
  imgUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export interface AutoWithId extends AutoNotId {
  id: string;
}

export interface AutoFirebase {
  [id: string]: AutoNotId;
}