import { KegiatanRepository } from "../repositories/kegiatan.repository";

interface CreateKegiatanPayload {
  nama: string;
  tanggal_mulai: Date;
  tanggal_selesai: Date;
  lokasi: string;
}

export class KegiatanService {
  public static async postKegiatan(data: CreateKegiatanPayload) {

    const tahun = data.tanggal_mulai.getFullYear();
		const bulan = (data.tanggal_mulai.getMonth() + 1).toString().padStart(2, "0"); // +1 karena bulan JS dari 0, padStart untuk format "08"
		const tanggal = data.tanggal_mulai.getDate().toString().padStart(2, "0");

		const uniqueSuffix = Date.now().toString().slice(-4);

		const generatedId = `${tahun}${bulan}${tanggal}-${uniqueSuffix}`;

    const id = generatedId;
    const nama = data.nama;
    const lokasi = data.lokasi;
    const tanggal_mulai = data.tanggal_mulai; // Kirim sebagai objek Date untuk konsistensi
    const tanggal_selesai = data.tanggal_selesai;

    // Service akan langsung menyimpan data yang sudah diolah oleh controller
    return await KegiatanRepository.create(id, nama, lokasi, tanggal_mulai, tanggal_selesai);
  }

  public static async getAllKegiatan() {
    return await KegiatanRepository.getAll();
  }
}
