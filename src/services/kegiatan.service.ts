import prisma from "../infrastructures/db.infrastructure";

interface CreateKegiatanPayload {
  id: string;
  nama: string;
  tanggal_mulai: Date;
  tanggal_selesai: Date;
  lokasi: string;
}

export class KegiatanService {
  public static async postKegiatan(data: CreateKegiatanPayload) {
    // Service akan langsung menyimpan data yang sudah diolah oleh controller
    const kegiatan = await prisma.kegiatan.create({
      data: data,
    });
    return kegiatan;
  }
}
