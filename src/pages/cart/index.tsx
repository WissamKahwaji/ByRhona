import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { CART_TABLE_HEADER } from "../../constants";
import {
  clearCart,
  clearProduct,
  decrementProductNumber,
  incrementProductNumber,
  selectCartValues,
} from "../../features/cart/slice";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { TbShoppingCartOff } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const cartValues = useAppSelector(selectCartValues);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <div
      className="m-auto max-w-6xl  py-6 md:py-8 "
      style={{ direction: "ltr" }}
    >
      <p className=" pb-6 text-center text-2xl font-bold  capitalize text-black md:pb-8">
        {t("order_review")}
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            {CART_TABLE_HEADER.map(head => (
              <TableHead key={head}>{t(head)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-background">
          {cartValues.cartValues.map(cartValue => (
            <TableRow key={cartValue._id}>
              <TableCell>
                <div className="flex gap-2">
                  <div className="h-14 w-14 shrink-0">
                    <img
                      className="aspect-square h-full w-full object-cover"
                      src={cartValue.img}
                      alt={cartValue.title}
                    />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm lg:text-lg">
                      <span>{cartValue.title}</span>
                      <span> * </span>
                      <span>{cartValue.count}</span>
                    </p>
                    <p className=" text-muted-foreground ">
                      <span className="mr-1">
                        {cartValue?.price.priceAED.toFixed(2)}
                      </span>
                      <span className="uppercase">aed</span>
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center ">
                  <button
                    type="button"
                    className="transition-transform hover:scale-90"
                    onClick={() => {
                      dispatch(
                        incrementProductNumber({ id: cartValue.localId })
                      );
                    }}
                  >
                    <CiSquarePlus className="h-10 w-10 md:h-12 md:w-12" />
                  </button>
                  <p
                    //   type="number"
                    //   value={cartValue.count}
                    className="flex h-10 w-10 items-center justify-center border bg-background shadow-sm md:h-12  md:w-12"
                    //   onChange={(e) =>
                    //     dispatch(
                    //       changeByAmount({
                    //         id: cartValue._id,
                    //         amount: Number(e.target.value),
                    //       }),
                    //     )
                    //   }
                  >
                    {cartValue.count}{" "}
                  </p>
                  <button
                    type="button"
                    disabled={cartValue.count <= 1}
                    className="transition-transform hover:scale-90 disabled:text-muted-foreground disabled:hover:scale-100"
                    onClick={() =>
                      dispatch(
                        decrementProductNumber({ id: cartValue.localId })
                      )
                    }
                  >
                    <CiSquareMinus className="h-10 w-10 md:h-12 md:w-12" />
                  </button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">{cartValue.note ?? "-------"}</div>
              </TableCell>

              <TableCell>
                <p>
                  <span className="mr-1">
                    {(
                      Number(cartValue.price.priceAED) * cartValue.count
                    ).toFixed(2)}
                  </span>
                  <span className=" uppercase">aed</span>
                </p>
              </TableCell>
              <TableCell>
                <MdDelete
                  className="text-2xl text-red-500 cursor-pointer"
                  onClick={() =>
                    dispatch(clearProduct({ id: cartValue.localId }))
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="ml-4 mt-5 flex flex-col justify-between gap-4 md:flex-row lg:ml-0">
        <div className="flex gap-2">
          <p className="font-semibold capitalize ">{t("total")}: </p>
          <p className="text-muted-foreground">
            <span className="mr-1 ">
              {cartValues.cartValues
                .reduce(
                  (acc, pre) => acc + pre.count * Number(pre.price.priceAED),
                  0
                )
                .toFixed(2)}
            </span>
            <span className="uppercase">{t("aed")}</span>
          </p>
        </div>
        <div className=" flex flex-wrap items-center gap-4 capitalize">
          <button className="bg-foreground px-2 py-1 rounded-md capitalize">
            <Link to={"/products"}>{t("continue_shopping")}</Link>
          </button>
          <button className="bg-foreground px-2 py-1 rounded-md capitalize">
            <Link to={"/payment-order-details"}>{t("check_out")}</Link>
          </button>
          <button
            className="bg-primary text-white px-2 py-1 rounded-md flex justify-start items-center gap-x-2 capitalize"
            onClick={() => dispatch(clearCart())}
          >
            <TbShoppingCartOff />
            <p>{t("clear_all")}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
