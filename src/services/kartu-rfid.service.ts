import KartuRfidRepository from "../repositories/kartu-rfid.repository";
import MahasiswaRepository from "../repositories/kartu-rfid.repository";
import { APIError } from "../utils/api-error.util";

export default class KartuRfidService {
    
    public static async post(id: string, nim: string) {
		const mahasiswa = await KartuRfidRepository.create(id, nim);
		if (!mahasiswa) {
			throw new APIError(`Waduh, kamu siapa sih? 😭`, 404);
		}
		return {
			response: true,
			message: "Data mahasiswa berhasil diubah! 😁",
			data: mahasiswa,
		};
	}
    
}
