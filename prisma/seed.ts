import prisma from "../src/infrastructures/db.infrastructure";

console.log("[INFO] Seeding database...");

async function main() {
	console.log("[DEBUG] Running createMany...");

	const resultMahasiswa = await prisma.mahasiswa.createMany({
		data: [
			{
				nim: "12250113521",
				nama: "M. Farhan Aulia Pratama",
				email: "12250113521@students.uin-suska.ac.id",

			},
			{
				nim: "12250111134",
				nama: "Muh. Zaki Erbai Syas",
				email: "12250111134@students.uin-suska.ac.id",
			},
			{
				nim: "12350111224",
				nama: "As-Siddiqi Pohan",
				email: "12350111224@students.uin-suska.ac.id",
			}

		],
		skipDuplicates: true,
	});

	console.log(
		"[DEBUG] Result of inserted mahasiswa createMany:",
		resultMahasiswa.count > 0
			? resultMahasiswa
			: "Data was inserted previously, no new data inserted."
	);

	const resultKartuRfid = await prisma.kartu_rfid.createMany({
		data: [
			{
				id: "E394BC14",
				status: "ACTIVE",
				nim: "12250113521",
			}
		],
		skipDuplicates: true,
	});

	console.log(
		"[DEBUG] Result of inserted kartu_rfid createMany:",
		resultKartuRfid.count > 0
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


	
