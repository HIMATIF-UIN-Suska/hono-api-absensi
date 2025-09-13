import { Context } from "hono";
import { APIError } from "../utils/api-error.util";
import { KegiatanService } from "../services/kegiatan.service";

export default class KegiatanHandler {

	public static async postKegiatan(c: Context) {
		const { tanggal_mulai, tanggal_selesai, lokasi, nama } = await c.req.json();
		if (!tanggal_mulai || !tanggal_selesai || !lokasi || !nama) {
			throw new APIError("Waduh, semua field harus diisi, mas! 😭", 400);
		}

		const mulai = new Date(tanggal_mulai);

		const dataKegiatan = {
			nama,
			tanggal_mulai: mulai, // Kirim sebagai objek Date untuk konsistensi
			tanggal_selesai: new Date(tanggal_selesai),
			lokasi,
		};

		// 5. Panggil service untuk menyimpan data
		const kegiatanBaru = await KegiatanService.postKegiatan(dataKegiatan);

		// 6. Kembalikan response sukses
		return c.json(
			{
				message: "Kegiatan berhasil ditambahkan!",
				data: kegiatanBaru,
			},
			201
		);
	}

	public static async getKegiatan(c: Context) {
		const all_kegiatan = await KegiatanService.getAllKegiatan();
		return c.json(all_kegiatan, 200);
	}
}
