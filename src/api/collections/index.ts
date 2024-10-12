import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { CollectionModel } from "./type";

const getCollectionsInfo = async () => {
  const res = await publicInstance.get<CollectionModel[]>(
    API_ROUTES.COLLECTIONS.GET
  );
  return res.data;
};

const getCollectionByIdInfo = async (id: string) => {
  const res = await publicInstance.get<CollectionModel>(
    API_ROUTES.COLLECTIONS.GET_ById(id)
  );
  return res.data;
};

export { getCollectionsInfo, getCollectionByIdInfo };
