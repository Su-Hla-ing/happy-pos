export interface Menu {
  id?: string;
  name: string;
  price: number;
  locationIds: string[];
  imageUrl?: string;
  addonCategoriesIds?: string[];
  menuCategoriesIds?: string[];
}

export interface CreateMenuParams {
  name: string;
  price: number;
  locationIds: string[];
  imageUrl: string;
}
