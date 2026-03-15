import urlAxios from "../utils/urlAxios";
import type { JsonBody, AdminCategoryRow } from "../types/api";

export const getAdminProductCategories = async (): Promise<
  JsonBody<AdminCategoryRow[]>
> => {
  const response = await urlAxios.get("/admin/product-categories", {
    headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    params: { _t: Date.now() },
  });
  return response.data;
};
