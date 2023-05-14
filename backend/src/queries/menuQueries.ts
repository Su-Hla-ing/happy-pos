import { pool } from "../../db/db";
import { Menu, CreateMenuParams } from "../types/menu";

interface MenuQueries {
  createMenu: (createMenuParams: CreateMenuParams) => Promise<Menu>;
  getMenu: (menuId: string) => Promise<Menu | undefined>;
  // getMenusByLocationId: (locationId: string) => Promise<Menu[] | undefined>;
}
export const menuQueries: MenuQueries = {
  createMenu: async (createMenuParams: CreateMenuParams) => {
    const { name, price, locationIds, imageUrl } = createMenuParams;
    const text =
      "INSERT INTO menus(name, price, image_url) VALUES($1, $2, $3) RETURNING *";
    const values = [name, price, imageUrl];
    const result = await pool.query(text, values);
    // console.log(result.rows);
    const menu = result.rows[0] as Menu;
    console.log(menu);
    const menuId = menu.id as string;
    console.log("menuid...", menuId);
    const imgUrl = menu.imageUrl as string;

    const locationResult = await pool.query("select * from menus_locations");

    const locationId: string[] = locationResult.rows.map(
      (item) => item.location_id
    );
    console.log(locationId);

    return { id: menuId, name, price, locationIds: locationId };
  },

  getMenu: async (menuId: string) => {
    const menuResult = await pool.query("select * from menus where id = $1", [
      menuId,
    ]);
    const hasMenu = menuResult.rows.length > 0;
    if (hasMenu) {
      const menu = menuResult.rows[0] as Menu;
      const locationsResult = await pool.query(
        "select location_id from menus_locations where menu_id = $1",
        [menuId]
      );
      const locationIds = locationsResult.rows.map((row) => row.location_id);

      const addonCategoriesResult = await pool.query(
        "select addons_categories_id from menus_addons_categories where menu_id = $1",
        [menuId]
      );
      const addonCategoriesIds = addonCategoriesResult.rows.map(
        (row) => row.addons_categories_id
      );

      const menusMenusCategoriesResult = await pool.query(
        "select menu_categories_id from menus_menus_categories where menu_id = $1",
        [menuId]
      );
      const menuCategoriesIds = menusMenusCategoriesResult.rows.map(
        (row) => row.menu_categories_id
      );

      return {
        id: menuId,
        name: menu.name,
        price: menu.price,
        locationIds,
        addonCategoriesIds,
        menuCategoriesIds,
      };
    }
  },
  // getMenusByLocationId: async (locationId: string) => {
  //   const locationResult = await pool.query(
  //     "select menu_id from menus_locations where id = $1",
  //     [locationId]
  //   );
  //   const menuId = locationResult.rows;

  //   const menuResult = await pool.query("select * from menus where id = $1", [
  //     menuId,
  //   ]);
  //   const menu = menuResult.rows as Menu[];

  //   return { id: locationId, name: menu[0].name, price: menu[0].price };
  // },
};
