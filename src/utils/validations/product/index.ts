import * as z from "zod";
const addToCartValidationSchema = z.object({
  count: z
    .number()
    .min(1, "Please enter product count equal to or grater than 1."),
  note: z.any(),
});
export default addToCartValidationSchema;
export type AddToCartValues = z.infer<typeof addToCartValidationSchema>;
