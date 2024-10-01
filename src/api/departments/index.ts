import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { DepartmentModel } from "./type";

const getDepartmentsInfo = async () => {
  const res = await publicInstance.get<DepartmentModel[]>(
    API_ROUTES.DEPARTMENT.GET
  );
  return res.data;
};

export { getDepartmentsInfo };
