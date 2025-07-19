import { Context } from "hono";
import { APIError } from "../utils/api-error.util";
import KartuRfidService from "../services/kartu-rfid.service";
import CryptoHelper from "../helpers/crypto.helper";

export default class KartuRfidHandler {
  public static async post(c: Context) {
    const { id, nim } = await c.req.json();
    return c.json(await KartuRfidService.post(id, nim), 201);
  }

  public static async absensi(c: Context) {
    const {rfid_id} = await c.req.json();
    
    if (!rfid_id) {
      throw new APIError("Waduh, ID tidak boleh kosong, mas! 😭", 400);
    }
     const result = await KartuRfidService.absensi(rfid_id);

     // Kembalikan hasil sukses dari service
     return c.json(result, 200);
  }

  public static async get(c: Context) {
    const { id } = c.req.param();
    if (!id) {
      throw new APIError("Waduh, ID tidak boleh kosong, mas! 😭", 400);
    }
    const rfid = await KartuRfidService.get(id);
    return c.json(rfid, 200);
  }

  public static async getAbsensi(c: Context) {
    const all_absensi = await KartuRfidService.getAllAbsensi();
    return c.json(all_absensi, 200);
  }

  public static async verify(c: Context) {
    try {
      const { id } = c.req.param();

      // Proses dekripsi dan verifikasi
      const iddecoded = CryptoHelper.decryptIDToPayload(id);
      const verificationResult = await KartuRfidService.verify(iddecoded);

      return c.json(verificationResult, 200);
    } catch (error) {
      // Cek jika error adalah instance dari APIError kustom Anda
      if (error instanceof APIError) {
        return c.json({ message: error.message }, error.statusCode as any);
      }

      // Tangani error umum lainnya (seperti gagal dekripsi)
      console.error("Error pada proses verifikasi:", error);
      return c.json({ message: "Terjadi kesalahan pada server." }, 500);
    }
  }
}
