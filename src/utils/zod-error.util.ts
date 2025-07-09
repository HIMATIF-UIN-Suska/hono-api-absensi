import { APIError } from "./api-error.util";

export const zodError = (r: any) => {
  if (!r.success) {
    throw new APIError(r.error.issues[0].message, 400);
  }
};
