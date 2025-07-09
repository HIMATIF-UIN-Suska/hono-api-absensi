import prisma from "../infrastructures/db.infrastructure";

export default class MahasiswaRepository {
	public static async findAll() {
		return prisma.mahasiswa.findMany();
	}

	public static async findByNIM(nim: string) {
		return prisma.mahasiswa.findUnique({
			where: { nim },
		});
	}

	public static async findByEmail(email: string) {
		return prisma.mahasiswa.findUnique({
			where: { email },
		});
	}

	public static async create(
		nim: string,
		nama: string,
		email: string,
		nip: string
	) {
		return prisma.mahasiswa.create({ data: { nim, nama, email, nip } });
	}

	public static async update(
		nim: string,
		nama: string,
		email: string,
		nip: string
	) {
		return prisma.mahasiswa.update({
			where: { nim },
			data: { nim, nama, email, nip },
		});
	}

    public static async destroy(nim: string) {
        return prisma.mahasiswa.delete({
            where: { nim },
        });
    }
}
