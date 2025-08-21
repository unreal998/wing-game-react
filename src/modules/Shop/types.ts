export type ShopValues = {
  price: number;
  tonValue: number;
  turxValue: number;
};

export type ShopData = {
  area: string;
  created_at: string;
  id: number;
  values: ShopValues[];
};

export type BuyItemType = {
  windSpeed: number;
  selectedArea: string;
  uid: string;
};
