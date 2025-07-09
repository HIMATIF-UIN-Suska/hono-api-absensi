import prisma from "../src/infrastructures/db.infrastructure";

console.log("[INFO] Seeding database...");

async function main() {
	console.log("[DEBUG] Running createMany...");

	const resultDosen = await prisma.dosen.createMany({
		data: [
			{
				nip: "2312423143212",
				nama: "Jane William",
				email: "jane.william@gmail.com",
			},
		],
		skipDuplicates: true,
	});

	console.log(
		"[DEBUG] Result of inserted dosen createMany:",
		resultDosen.count > 0
			? resultDosen
			: "Data was inserted previously, no new data inserted."
	);

	const resultMahasiswa = await prisma.mahasiswa.createMany({
		data: [
			{
				nim: "12293102930",
				nama: "John Doe",
				email: "john.doe@gmail.com",
				nip: "2312423143212"
			},
		],
		skipDuplicates: true,
	});

	console.log(
		"[DEBUG] Result of inserted mahasiswa createMany:",
		resultMahasiswa.count > 0
			? resultMahasiswa
			: "Data was inserted previously, no new data inserted."
	);
}

main()
	.catch((e) => {
		console.error(`[ERROR] ${e.message}`);
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log("[INFO] Seeding finished, disconnecting...");
		await prisma.$disconnect();
		process.exit(0);
	});
