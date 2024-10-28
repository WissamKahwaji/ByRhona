import { Link, useParams } from "react-router-dom";
import { useGetUserOrdersQuery } from "../../api/order/queries";
import LoadingPage from "../loading-page";

import { useTranslation } from "react-i18next";

const Orders = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { data: userOrders, isLoading, isError } = useGetUserOrdersQuery(id);
  const { t } = useTranslation();
  if (isLoading) return <LoadingPage />;
  if (isError) return <></>;
  return (
    <div className="m-auto max-w-6xl py-12 md:py-12 ">
      <p className=" pb-6 text-center text-2xl font-bold  capitalize text-black md:pb-8">
        {t("my_orders")}
      </p>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-6">
        {userOrders?.map((order, index) => (
          <Link to={`details/${order._id}`}>
            <div
              className="bg-foreground/30 rounded-md shadow-sm shadow-gray-200 flex flex-col justify-start items-start space-y-1 px-3 py-1 cursor-pointer hover:scale-105 duration-300 ease-in-out"
              key={index}
            >
              <p className="text-primary font-semibold">
                {t("order_number")} : {userOrders.length - index}
              </p>
              <p className="text-primary font-semibold">
                {t("placed_at")} :{" "}
                {new Date(order.createdAt ?? "").toLocaleDateString()}
              </p>
              <div className="flex flex-row">
                <p className="text-primary font-semibold">{t("location")} : </p>
                <p>{order.country}</p>
                {order.city && <p> / {order.city}</p>}
              </div>
              <div className="flex flex-row">
                <p className="text-primary font-semibold">
                  {t("total_order_amount")} :{" "}
                </p>
                <p>{order.cartItemsTotalPrice} AED</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
