import prisma from "../src/infrastructures/db.infrastructure";

console.log("[INFO] Seeding database...");

async function main() {
	console.log("[DEBUG] Running createMany...");

	const resultJabatan = await prisma.jabatan.createMany({
		data: [
			{
				id: "HMT-I-BUP",
				nama: "Bupati",
			},
			{
				id: "HMT-I-WABUP",
				nama: "Wakil Bupati",
			},
			{
				id: "HMT-I-BEN",
				nama: "Bendahara",
			},
			{
				id: "HMT-I-SEK-1",
				nama: "Sekretaris Umum 1",
			},
			{
				id: "HMT-I-SEK-2",
				nama: "Sekretaris Umum 2",
			},
			{
				id: "HMT-D-KAG",
				nama: "Kepala Departemen Agama",
			},
			{
				id: "HMT-D-AG",
				nama: "Staff Departemen Agama",
			},
			{
				id: "HMT-D-KFOR",
				nama: "Kepala Departemen Forensik",
			},
			{
				id: "HMT-D-FOR",
				nama: "Staff Departemen Forensik",
			},
			{
				id: "HMT-D-KHUM",
				nama: "Kepala Departemen Humas",
			},
			{
				id: "HMT-D-HUM",
				nama: "Staff Departemen Humas",
			},
			{
				id: "HMT-D-KINF",
				nama: "Kepala Departemen INFOKOM",
			},
			{
				id: "HMT-D-INF",
				nama: "Staff Departemen INFOKOM",
			},
			{
				id: "HMT-D-KINR",
				nama: "Kepala Departemen INRISTEK",
			},
			{
				id: "HMT-D-INR",
				nama: "Staff Departemen INRISTEK",
			},
			{
				id: "HMT-D-KKES",
				nama: "Kepala Departemen Kesekretariatan",
			},
			{
				id: "HMT-D-KES",
				nama: "Staff Departemen Kesekretariatan",
			},
			{
				id: "HMT-D-KPSDM",
				nama: "Kepala Departemen Pengembangan Sumber Daya Mahasiswa",
			},
			{
				id: "HMT-D-PSDM",
				nama: "Staff Departemen Pengembangan Sumber Daya Mahasiswa",
			},
			{
				id: "HMT-D-KTEC",
				nama: "Kepala Departemen Technopreneurship",
			},
			{
				id: "HMT-D-TEC",
				nama: "Staff Departemen Technopreneurship",
			},
		],
		skipDuplicates: true,
	});

	console.log(
		"[DEBUG] Result of inserted jabatan createMany:",
		resultJabatan.count > 0
			? resultJabatan
			: "Data was inserted previously, no new data inserted."
	);

	const resultMahasiswa = await prisma.mahasiswa.createMany({
		data: [
			{
				nim: "12250115572",
				nama: "M. Novryanda Reza",
				email: "12250115572@students.uin-suska.ac.id",
				id_jabatan: "HMT-I-BUP",
			},
			{
				nim: "12250115371",
				nama: "Muhammad Ghalib Pradipa",
				email: "12250115371@students.uin-suska.ac.id",
				id_jabatan: "HMT-I-WABUP",
			},
			{
				nim: "12250121159",
				nama: "Azizah Tasyikira Paramitha El Razi",
				email: "12250121159@students.uin-suska.ac.id",
				id_jabatan: "HMT-I-BEN",
			},
			{
				nim: "12250121455",
				nama: "Fioni Nikmatul Fajar",
				email: "12250121455@students.uin-suska.ac.id",
				id_jabatan: "HMT-I-SEK-1",
			},
			{
				nim: "12350121100",
				nama: "Najah Karimah Mukhlis",
				email: "12350121100@students.uin-suska.ac.id",
				id_jabatan: "HMT-I-SEK-2",
			},
			{
				nim: "12250115109",
				nama: "Yadullah Asy-Syakiri",
				email: "12250115109@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KAG",
			},
			{
				nim: "12250112779",
				nama: "Ramadhani Herfin",
				email: "12250112779@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-AG",
			},
			{
				nim: "12250111048",
				nama: "Muhammad Aditya Rinaldi",
				email: "12250111048@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KFOR",
			},
			{
				nim: "12350111030",
				nama: "Ahmad Fadli Pratama",
				email: "12350111030@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-FOR",
			},
			{
				nim: "12350111357",
				nama: "Muhammad Najib Saragih",
				email: "12350111357@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-FOR",
			},
			{
				nim: "12350113828",
				nama: "Rahmat Al Ghifari",
				email: "12350113828@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-FOR",
			},
			{
				nim: "12250115675",
				nama: "Muhammad Azmi",
				email: "12250115675@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KHUM",
			},
			{
				nim: "12250124499",
				nama: "Faridatul Jannah",
				email: "12250124499@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-HUM",
			},
			{
				nim: "12250125321",
				nama: "Husna Satira",
				email: "12250125321@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-HUM",
			},
			{
				nim: "12350121154",
				nama: "Indah Purnama Sari",
				email: "12350121154@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-HUM",
			},
			{
				nim: "12250113387",
				nama: "Muhammad Ilham Akbar",
				email: "12250113387@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-HUM",
			},
			{
				nim: "12250114335",
				nama: "Raihan",
				email: "12250114335@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-HUM",
			},
			{
				nim: "12250124591",
				nama: "Restu Kharrisa Andini",
				email: "12250124591@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-HUM",
			},
			{
				nim: "12250120341",
				nama: "Abmi Sukma Edri",
				email: "12250120341@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KINF",
			},
			{
				nim: "12350121062",
				nama: "Cinta Aprilianti",
				email: "12350121062@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INF",
			},
			{
				nim: "12350111606",
				nama: "Ghilman Zikra",
				email: "12350111606@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INF",
			},
			{
				nim: "12250110361",
				nama: "Haritsah Naufaldy",
				email: "12250110361@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INF",
			},
			{
				nim: "12350111267",
				nama: "Rendy Rizqika Maulana",
				email: "12350111267@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INF",
			},
			{
				nim: "12350112942",
				nama: "Rizky Syakuur Rahman",
				email: "12350112942@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INF",
			},
			{
				nim: "12250115356",
				nama: "Salman Al Parisi",
				email: "12250115356@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INF",
			},
			{
				nim: "12250113521",
				nama: "M. Farhan Aulia Pratama",
				email: "12250113521@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KINR",
			},
			{
				nim: "12350111224",
				nama: "As-Siddiqi Pohan",
				email: "12350111224@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INR",
			},
			{
				nim: "12250115051",
				nama: "Fahryan Rizky Pratama",
				email: "12250115051@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INR",
			},
			{
				nim: "12250111323",
				nama: "Gilang Ramadhan Indra",
				email: "12250111323@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INR",
			},
			{
				nim: "12350123200",
				nama: "Haniva Azzahra Salsabila",
				email: "12350123200@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INR",
			},
			{
				nim: "12250114214",
				nama: "M. Diki Wahyudi",
				email: "12250114214@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INR",
			},
			{
				nim: "12250111489",
				nama: "Muhammad Rafly Wirayudha",
				email: "12250111489@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INR",
			},
			{
				nim: "12250111527",
				nama: "M. Nabil Dawami",
				email: "12250111527@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-INR",
			},
			{
				nim: "12250114883",
				nama: "Ade Chandra",
				email: "12250114883@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KKES",
			},
			{
				nim: "12350120896",
				nama: "Alyaa Chalta Theopania",
				email: "12350120896@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KES",
			},
			{
				nim: "12250115210",
				nama: "Muhammad Abdan Syakura",
				email: "12250115210@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KES",
			},
			{
				nim: "12350111125",
				nama: "Naufal Hidayatul Aulia",
				email: "12350111125@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KES",
			},
			{
				nim: "12250113444",
				nama: "Farhan Fadhila",
				email: "12250113444@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KPSDM",
			},
			{
				nim: "12350113333",
				nama: "Abdi Wira Syahputra",
				email: "12350113333@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-PSDM",
			},
			{
				nim: "12250113564",
				nama: "Aqmal Syarif Fadilah",
				email: "12250113564@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-PSDM",
			},
			{
				nim: "12350114023",
				nama: "Gilang Andika Pratama",
				email: "12350114023@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-PSDM",
			},
			{
				nim: "12350123140",
				nama: "Jelita Aurelia",
				email: "12350123140@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-PSDM",
			},
			{
				nim: "12350114518",
				nama: "M. Hafizh Akbar",
				email: "12350114518@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-PSDM",
			},
			{
				nim: "12350113206",
				nama: "Pangeran Nusa",
				email: "12350113206@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-PSDM",
			},
			{
				nim: "12350123000",
				nama: "Putri Maharani",
				email: "12350123000@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-PSDM",
			},
			{
				nim: "12350122946",
				nama: "Rani Dwi Sopia",
				email: "12350122946@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-PSDM",
			},
			{
				nim: "12250115319",
				nama: "Reyhan",
				email: "12250115319@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-PSDM",
			},
			{
				nim: "12250111514",
				nama: "Ahmad Kurniawan",
				email: "12250111514@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-KTEC",
			},
			{
				nim: "12350124381",
				nama: "Aulia Natasya Reyhana",
				email: "12350124381@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-TEC",
			},
			{
				nim: "12250111298",
				nama: "Dwi Mahdini",
				email: "12250111298@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-TEC",
			},
			{
				nim: "12350111058",
				nama: "Fadlan Amar Ma'ruf",
				email: "12350111058@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-TEC",
			},
			{
				nim: "12350110343",
				nama: "Joko Suprianto",
				email: "12350110343@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-TEC",
			},
			{
				nim: "12350120203",
				nama: "Rani Perdani",
				email: "12350120203@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-TEC",
			},
			{
				nim: "12350111381",
				nama: "Reski",
				email: "12350111381@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-TEC",
			},
			{
				nim: "12350120065",
				nama: "Wirdatul Jannah",
				email: "12350120065@students.uin-suska.ac.id",
				id_jabatan: "HMT-D-TEC",
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

	const resultKartuRfid = await prisma.kartu_rfid.createMany({
		data: [
			{
				id: "E394BC14",
				status: "ACTIVE",
				nim: "12250113521",
			},
		],
		skipDuplicates: true,
	});

	console.log(
		"[DEBUG] Result of inserted kartu_rfid createMany:",
		resultKartuRfid.count > 0
			? resultKartuRfid
			: "Data was inserted previously, no new data inserted."
	);

	const resultKegiatan = await prisma.kegiatan.upsert({
		// Kriteria untuk mencari data duplikat
		where: {
			id: "20250101-1111",
		},
		// Jika data ditemukan, jangan lakukan apa-apa
		update: {},
		// Jika data tidak ditemukan, buat data baru
		create: {
			id: "20250101-1111",
			nama: "Absensi Harian",
			lokasi: "Sekretariat HIMATIF UIN Suska Riau, GB-FST LT.2",
		},
	});

	console.log("[DEBUG] Result of upserted kegiatan:", resultKegiatan);
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
