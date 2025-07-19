import { z } from "zod";

export const postRfidSchema = z.object({
  id: z.string(),
  nim: z
    .string({
      required_error: "Waduh, NIM tidak boleh kosong, mas! 😭",
      invalid_type_error: "Waduh, NIM harus berupa string, mas! 😭",
    })
    .regex(/^\d+$/, "Waduh, NIM harus berupa angka, mas! 😭")
    .refine((val) => val.length >= 11, {
      message: "Waduh, NIM harus terdiri dari minimal 11 digit, mas! 😭",
    }),
});

export const rfidIdSchema = z
  .object({
    rfid_id: z.string({
      required_error: "Waduh, ID tidak boleh kosong, mas! 😭",
      invalid_type_error: "Waduh, ID harus berupa string, mas! 😭",
    }),
  })
  .refine((data) => data.rfid_id.length > 0, {
    message: "Waduh, ID tidak boleh kosong, mas! 😭",
  });
