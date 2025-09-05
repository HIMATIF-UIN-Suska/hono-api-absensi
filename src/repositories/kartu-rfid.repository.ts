import prisma from "../infrastructures/db.infrastructure";

export default class KartuRfidRepository {
  public static async create(id: string, nim: string) {
    return prisma.kartu_rfid.create({ data: { id, nim } });
  }
  public static async findById(id: string) {
    return prisma.kartu_rfid.findUnique({ where: { id } });
  }

  public static async updateStatus(id: string, status: string) {
    return prisma.kartu_rfid.update({
      where: { id },
      data: {
        status:
          status as import("../generated/prisma").$Enums.type_status_kartu_rfid,
      },
    });
  }

  public static async findAbsensiToday(id_rfid: string) {
    // Tentukan waktu awal hari ini (pukul 00:00:00)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Tentukan waktu akhir hari ini (pukul 23:59:59.999)
    // Cara yang lebih aman adalah mengambil awal hari esok
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfToday.getDate() + 1);

    // Cari data absensi pertama yang cocok
    const existingAbsensi = await prisma.absensi.findFirst({
      where: {
        // Kondisi 1: id_rfid harus cocok
        id_rfid: id_rfid,
        // Kondisi 2: waktu_absen harus berada di rentang hari ini
        waktu_absen: {
          gte: startOfToday, // gte = Greater than or equal to (>= awal hari ini)
          lt: startOfTomorrow, // lt = Less than (< awal hari esok)
        },
      },
    });

    return existingAbsensi;
  }

  public static async getAllAbsensi() {
    return prisma.absensi.findMany({
      include: {
        kegiatan: true, // Ambil data kegiatan yang berelasi
        kartu: {
          include: {
            mahasiswa: {
              include: {
                jabatan: true, // Ambil data jabatan yang berelasi
              },
            }, // Ambil data mahasiswa yang berelasi
          },
        },
      },
    });
  }

  public static async findAbsensiByKegiatanToday(
    id_rfid: string,
    id_kegiatan: string
  ) {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const absensi = await prisma.absensi.findFirst({
      where: {
        id_rfid: id_rfid,
        id_kegiatan: id_kegiatan,
        waktu_absen: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    return absensi;
  }

  public static async absensi(id_rfid: string, id_kegiatan?: string) {
    try {
      // Membuat data absensi baru sambil menyertakan data dari relasi
      const newAbsensi = await prisma.absensi.create({
        data: {
          id_rfid: id_rfid,
          id_kegiatan: id_kegiatan,
          // waktu_absen akan otomatis diisi oleh @default(now()) dari skema
        },
        // 'include' digunakan untuk mengambil data dari tabel lain yang berelasi
        include: {
          // 'kartu' adalah nama relasi di model 'absensi' ke 'kartu_rfid'
          kartu: {
            // Dari model 'kartu_rfid', kita include lagi relasi 'mahasiswa'
            include: {
              mahasiswa: true, // 'true' berarti ambil semua field dari model mahasiswa
            },
          },
        },
      });

      // Memformat ulang hasil agar sesuai dengan output yang diinginkan
      const result = {
        nim: newAbsensi.kartu.mahasiswa.nim,
        nama: newAbsensi.kartu.mahasiswa.nama,
        id_rfid: newAbsensi.id_rfid,
        date: newAbsensi.waktu_absen,
      };

      return result;
    } catch (error) {
      // Error ini kemungkinan besar terjadi jika id_rfid tidak ditemukan di tabel kartu_rfid
      console.error("Gagal melakukan absensi:", error);
      // Anda bisa melempar error atau mengembalikan null/objek error
      throw new Error(`Kartu RFID dengan ID "${id_rfid}" tidak terdaftar.`);
    }
  }
}
