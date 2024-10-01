import { CategoryModel } from "../categories/type";

export type DepartmentModel = {
  _id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  categories: CategoryModel[];
};
