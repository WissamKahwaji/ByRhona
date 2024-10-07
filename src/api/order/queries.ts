import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PaymentOrdersValue } from "./type";
import { getUserOrders, submitOrderDetails } from ".";
import { clearCart } from "../../features/cart/slice";
import { toast } from "react-toastify";

const useSubmitOrderDetailsMutation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["submit-order-details"],
    mutationFn: (data: PaymentOrdersValue) => submitOrderDetails(data),
    onSuccess(_data, variables) {
      if (variables.paymentMethod === "card") {
        dispatch(clearCart());
        toast.success("your order has submitted successfully");
      } else {
        dispatch(clearCart());
        toast.success("your order has submitted successfully");
        navigate(`/`, { replace: true });
      }
    },
    onError() {
      toast.error("failed to deliver order please reorder again");
    },
  });
};

const useGetUserOrdersQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["get-user-orders", id],
    queryFn: () => getUserOrders(id!),
    enabled: !!id,
  });

export { useSubmitOrderDetailsMutation, useGetUserOrdersQuery };
