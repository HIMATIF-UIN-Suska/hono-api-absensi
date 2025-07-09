import MahasiswaRepository from "../repositories/mahasiswa.repository";
import { APIError } from "../utils/api-error.util";

export default class MahasiswaService {
    public static async getMe(email: string) {
		const mahasiswa = await MahasiswaRepository.findByEmail(email);
		if (!mahasiswa) {
			throw new APIError(`Waduh, kamu siapa sih? 😭`, 404);
		}
		return {
			response: true,
			message: "Data kamu berhasil diambil! 😁",
			data: mahasiswa,
		};
	}
	public static async getAll() {
		const mahasiswa = await MahasiswaRepository.findAll();
		if (!mahasiswa) {
			throw new APIError(`Waduh, kamu siapa sih? 😭`, 404);
		}
		return {
			response: true,
			message: "Data semua mahasiswa berhasil diambil! 😁",
			data: mahasiswa,
		};
	}
    public static async get(nim: string) {
		const mahasiswa = await MahasiswaRepository.findByNIM(nim);
		if (!mahasiswa) {
			throw new APIError(`Waduh, kamu siapa sih? 😭`, 404);
		}
		return {
			response: true,
			message: "Data mahasiswa berhasil diambil! 😁",
			data: mahasiswa,
		};
	}
    public static async post(nim: string, nama: string, email: string, nip: string) {
		const mahasiswa = await MahasiswaRepository.create(nim, nama, email, nip);
		if (!mahasiswa) {
			throw new APIError(`Waduh, kamu siapa sih? 😭`, 404);
		}
		return {
			response: true,
			message: "Data mahasiswa berhasil diubah! 😁",
			data: mahasiswa,
		};
	}
    public static async put(nim: string, nama: string, email: string, nip: string) {
		const mahasiswa = await MahasiswaRepository.update(nim, nama, email, nip);
		if (!mahasiswa) {
			throw new APIError(`Waduh, kamu siapa sih? 😭`, 404);
		}
		return {
			response: true,
			message: "Data mahasiswa berhasil diperbarui! 😁",
			data: mahasiswa,
		};
	}
    public static async delete(nim: string) {
		const mahasiswa = await MahasiswaRepository.destroy(nim);
		if (!mahasiswa) {
			throw new APIError(`Waduh, kamu siapa sih? 😭`, 404);
		}
		return {
			response: true,
			message: "Data mahasiswa berhasil dihapus! 😁",
			data: mahasiswa,
		};
	}
}
