import { useParams } from "react-router-dom";
import { useGetUserOrdersQuery } from "../../api/order/queries";
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
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { data: userOrders, isLoading, isError } = useGetUserOrdersQuery(id);
  const { t } = useTranslation();
  if (isLoading) return <LoadingPage />;
  if (isError) return <></>;
  return (
    <div
      className="m-auto max-w-6xl py-12 md:py-12 "
      style={{ direction: "ltr" }}
    >
      <p className=" pb-6 text-center text-2xl font-bold  capitalize text-black md:pb-8">
        {t("my_orders")}
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            {ORDERS_TABLE_HEADER.map(head => (
              <TableHead key={head}>{t(head)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-background">
          {userOrders?.map(order =>
            order.cartItems.map(item => (
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;
