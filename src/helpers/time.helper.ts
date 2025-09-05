export default class TimeHelper {
	/**
	 * Fungsi untuk mendapatkan waktu saat ini dalam format yang diinginkan
	 * untuk zona waktu WIB (Asia/Jakarta).
	 * @returns {string} String tanggal dan waktu yang sudah diformat.
	 * Contoh: "Jumat, 5 September 2025 - 09:11 WIB"
	 */
	public static getWibTimeString = (): string => {
		// 1. Ambil waktu saat ini. Cukup sekali saja.
		// Objek Date ini secara internal menyimpan waktu dalam UTC.
		const now = new Date();

		// 2. Siapkan opsi pemformatan.
		// Kuncinya ada di `timeZone: 'Asia/Jakarta'`.
		const options: Intl.DateTimeFormatOptions = {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			timeZone: "Asia/Jakarta", // Ini yang membuat konversi akurat ke WIB
			timeZoneName: "short",
			hour12: false, // Gunakan format 24 jam agar lebih mudah di-replace
		};

		// 3. Buat formatter untuk Bahasa Indonesia.
		const formatter = new Intl.DateTimeFormat("id-ID", options);

		// 4. Lakukan format dan penyesuaian kecil agar sesuai permintaan.
		// Output default dari 'id-ID' biasanya "5 September 2025 pukul 09.11 WIB"
		let formattedDate = formatter
			.format(now)
			.replace("pukul", "-") // Ganti 'pukul' dengan ' - '
			.replace(/\./g, ":"); // Ganti pemisah jam '.' menjadi ':'

		return formattedDate;
	};
}