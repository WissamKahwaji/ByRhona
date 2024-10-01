import { DepartmentModel } from "../departments/type";
import { Product } from "../products/type";

export type CategoryModel = {
  _id: string;
  name: string;
  nameAr?: string;
  nameFr?: string;
  products?: Product[];
  department: DepartmentModel;
};

export type GetProductParams = {
  category: string | null;
};
