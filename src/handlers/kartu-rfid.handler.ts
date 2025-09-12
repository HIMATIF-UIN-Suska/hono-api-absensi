import { Context } from "hono";
import { APIError } from "../utils/api-error.util";
import KartuRFIDService from "../services/kartu-rfid.service";
import CryptoHelper from "../helpers/crypto.helper";
import { KegiatanService } from "../services/kegiatan.service";

export default class KartuRFIDHandler {
	public static async post(c: Context) {
		const { id, nim } = await c.req.json();
		return c.json(await KartuRFIDService.post(id, nim), 201);
	}

	public static async absensi(c: Context) {
		const { rfid_id } = await c.req.json();

		if (!rfid_id) {
			throw new APIError("Waduh, ID tidak boleh kosong, mas! 😭", 400);
		}
		const result = await KartuRFIDService.absensi(rfid_id);

		// Kembalikan hasil sukses dari service
		return c.json(result, 200);
	}

	public static async get(c: Context) {
		const { id } = c.req.param();
		if (!id) {
			throw new APIError("Waduh, ID tidak boleh kosong, mas! 😭", 400);
		}
		const rfid = await KartuRFIDService.get(id);
		return c.json(rfid, 200);
	}

	public static async getAbsensi(c: Context) {
		const all_absensi = await KartuRFIDService.getAllAbsensi();
		return c.json(all_absensi, 200);
	}

	public static async verify(c: Context) {
		try {
			const { id } = c.req.param();

			// remove query api key
			const idWithoutQuery = id.split("?")[0];

			// Proses dekripsi dan verifikasi
			const decoded_ID = CryptoHelper.decryptIDToPayload(idWithoutQuery);
			const verificationResult = await KartuRFIDService.verify(decoded_ID);

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

	public static async postKegiatan(c: Context) {
		const { tanggal_mulai, tanggal_selesai, lokasi, nama } = await c.req.json();
		if (!tanggal_mulai || !tanggal_selesai || !lokasi || !nama) {
			throw new APIError("Waduh, semua field harus diisi, mas! 😭", 400);
		}

		const mulai = new Date(tanggal_mulai);
		const tahun = mulai.getFullYear();
		const bulan = (mulai.getMonth() + 1).toString().padStart(2, "0"); // +1 karena bulan JS dari 0, padStart untuk format "08"
		const tanggal = mulai.getDate().toString().padStart(2, "0");

		const uniqueSuffix = Date.now().toString().slice(-4);

		const generatedId = `${tahun}${bulan}${tanggal}-${uniqueSuffix}`;

		const dataKegiatan = {
			id: generatedId,
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
