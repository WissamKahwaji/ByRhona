import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../api/order/queries";
import { useTranslation } from "react-i18next";
import LoadingPage from "../loading-page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { ORDERS_TABLE_HEADER } from "../../constants";

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string | undefined }>();
  const { data: orderInfo, isLoading, isError } = useGetOrderByIdQuery(orderId);
  const { t } = useTranslation();

  if (isLoading) return <LoadingPage />;
  if (isError) return <></>;

  return (
    <div className="m-auto max-w-6xl py-12 md:py-12 px-3 md:px-0">
      <p className=" pb-6 text-center text-2xl font-bold  capitalize text-black md:pb-8">
        {t("order_details")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
        <div className="flex justify-start items-center gap-x-1">
          <p className="text-primary font-semibold">{t("placed_at")} :</p>
          <p> {new Date(orderInfo?.createdAt ?? "").toLocaleDateString()}</p>
        </div>
        <div className="flex justify-start items-center gap-x-1">
          <p className="text-primary font-semibold">{t("full_name")} :</p>
          <p> {orderInfo?.userName}</p>
        </div>
        <div className="flex justify-start items-center gap-x-1">
          <p className="text-primary font-semibold">{t("mobile_number")} :</p>
          <p> {orderInfo?.userMobileNumber}</p>
        </div>
        <div className="flex justify-start items-center gap-x-1">
          <p className="text-primary font-semibold">{t("country")} :</p>
          <p>
            {orderInfo?.country}/ {orderInfo?.city}
          </p>
        </div>
        <div className="flex justify-start items-center gap-x-1">
          <p className="text-primary font-semibold">{t("street")} :</p>
          <p>{orderInfo?.userStreet}</p>
        </div>
        <div className="flex justify-start items-center gap-x-1">
          <p className="text-primary font-semibold">{t("building")} :</p>
          <p>{orderInfo?.userBuilding}</p>
        </div>
        {orderInfo?.userFloorNo && (
          <div className="flex justify-start items-center gap-x-1">
            <p className="text-primary font-semibold">{t("floor_number")} :</p>
            <p>{orderInfo?.userFloorNo}</p>
          </div>
        )}
        {orderInfo?.userUnitNo && (
          <div className="flex justify-start items-center gap-x-1">
            <p className="text-primary font-semibold">{t("unit_number")} :</p>
            <p>{orderInfo?.userUnitNo}</p>
          </div>
        )}
        <div className="flex justify-start items-center gap-x-1">
          <p className="text-primary font-semibold">{t("payment_method")} :</p>
          <p>{orderInfo?.paymentMethod}</p>
        </div>
        {orderInfo?.isUseVoucher && (
          <div className="flex justify-start items-center gap-x-1">
            <p className="text-primary font-semibold">
              {t("is_used_voucher")} :
            </p>
            <p>{t("yes")}</p>
          </div>
        )}
        {orderInfo?.UsedVoucherAmount != undefined && (
          <div className="flex justify-start items-center gap-x-1">
            <p className="text-primary font-semibold">
              {t("used_voucher_amount")} :
            </p>
            <p>{orderInfo?.UsedVoucherAmount} AED</p>
          </div>
        )}
        {orderInfo?.deliveryFee != undefined && (
          <div className="flex justify-start items-center gap-x-1">
            <p className="text-primary font-semibold">{t("delivery_fee")} :</p>
            <p>{orderInfo?.deliveryFee} AED</p>
          </div>
        )}
        <div className="flex justify-start items-center gap-x-1">
          <p className="text-primary font-semibold">
            {t("total_order_amount")} :
          </p>
          <p>{orderInfo?.cartItemsTotalPrice} AED</p>
        </div>
      </div>
      <div className="mt-12  bg-foreground/30 " style={{ direction: "ltr" }}>
        <Table>
          <TableHeader>
            <TableRow>
              {ORDERS_TABLE_HEADER.map(head => (
                <TableHead key={head}>{t(head)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-gray-background">
            {orderInfo?.cartItems?.map(item => (
              <>
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="flex gap-2">
                      <div className="h-14 w-14 shrink-0">
                        <img
                          className="aspect-square h-full w-full object-cover"
                          src={item.img}
                          alt={item.title}
                        />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm lg:text-lg">
                          <span>{item.title}</span>
                          <span> * </span>
                          <span>{item.quantity}</span>
                        </p>
                        <p className=" text-muted-foreground ">
                          <span className="mr-1">
                            {item?.price.priceAED.toFixed(2)}
                          </span>
                          <span className="uppercase">AED</span>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity} </TableCell>

                  <TableCell>
                    <p>
                      <span className="mr-1">
                        {(Number(item.price.priceAED) * item.quantity).toFixed(
                          2
                        )}
                      </span>
                      <span className=" uppercase">AED</span>
                    </p>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderDetails;
