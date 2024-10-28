import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { ReviewsModel } from "./type";

const getReviewsInfo = async () => {
  const res = await publicInstance.get<ReviewsModel>(API_ROUTES.REVIEWS.GET);
  return res.data;
};

export { getReviewsInfo };
