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
}