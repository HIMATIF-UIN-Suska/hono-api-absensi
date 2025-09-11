import prisma from "../infrastructures/db.infrastructure";

export class MahasiswaRepository {
	public static async findByNIM(nim: string) {
		const mahasiswa = await prisma.mahasiswa.findFirst({
			select: {
				nama: true,
				nim: true,
				jabatan: {
					select: {
						nama: true
					}
				}
			},
			where: {
                nim
			},
		});
		return mahasiswa;
	}
}
