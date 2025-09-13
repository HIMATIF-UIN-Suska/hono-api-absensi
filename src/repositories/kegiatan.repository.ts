import prisma from "../infrastructures/db.infrastructure";

export class KegiatanRepository {
  public static async findActiveByDate(date: Date) {
    const kegiatan = await prisma.kegiatan.findFirst({
      where: {
        tanggal_mulai: {
          lte: date, // lte = Less Than or Equal (kurang dari atau sama dengan)
        },
        tanggal_selesai: {
          gte: date, // gte = Greater Than or Equal (lebih dari atau sama dengan)
        },
      },
    });
    return kegiatan;
  }

  public static async getAll() {
    const kegiatan = await prisma.kegiatan.findMany({
      orderBy: {
        tanggal_mulai: "desc", // Urutkan berdasarkan tanggal_mulai dari terbaru ke terlama
      },
      where: {
        tanggal_mulai: {
          not: null, // lte = Less Than or Equal (kurang dari atau sama dengan)
          gte: new Date(new Date().setDate(new Date().getDate() - 1)), // gte date - 1
        },
        tanggal_selesai: {
          not: null, // gte = Greater Than or Equal (lebih dari atau sama dengan)
        },
      }
    });
    return kegiatan;
  }

  public static async create(id: string, nama: string, lokasi: string, tanggal_mulai?: Date, tanggal_selesai?: Date) {
    const kegiatan = await prisma.kegiatan.create({
      data: {
        id: id,
        nama: nama,
        tanggal_mulai: tanggal_mulai, // Kirim sebagai objek Date untuk konsistensi
        tanggal_selesai: tanggal_selesai,
        lokasi: lokasi,
      },
    });
    return kegiatan;
  }
}