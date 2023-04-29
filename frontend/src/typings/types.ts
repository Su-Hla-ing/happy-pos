interface BaseType {
  id?: number;
  name: string;
}
export interface Menu extends BaseType {
  price: number;
  isAvailable?: boolean;
}
export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
  price: number;
  isAvailable: boolean;
  addonCategoriesIds: string[];
}

export interface AddonCategory extends BaseType {
  isRequired: boolean;
}

export interface Locations extends BaseType {
  adress: string;
}

export interface MenuLocations {
  id: number;
  menu_id: number;
  location_id: number;
  is_available?: boolean;
}
