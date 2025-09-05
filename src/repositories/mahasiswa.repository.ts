import prisma from "../infrastructures/db.infrastructure";

export class MahasiswaRepository {
	public static async findByNIM(nim: string) {
		const mahasiswa = await prisma.mahasiswa.findFirst({
			where: {
                nim
			},
		});
		return mahasiswa;
	}
}
