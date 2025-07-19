import CryptoHelper from "../helpers/crypto.helper";
import transporter from "../infrastructures/mail.infrastructure";
import KartuRfidRepository from "../repositories/kartu-rfid.repository";
import { APIError } from "../utils/api-error.util";

export default class KartuRfidService {
  public static async post(id: string, nim: string) {
    // Check if the RFID already exists
    const existingRfid = await KartuRfidRepository.findById(id);
    if (existingRfid) {
      throw new APIError("Waduh, Kartu RFID sudah ada, mas! 😭", 400);
    }

    await KartuRfidRepository.create(id, nim);
    const encryptedPayload = CryptoHelper.generateEncryptedIDByPayload(id);

    const verificationLink = `http://localhost:5173/aktivasi-kartu/${encryptedPayload}`;

	console.log("DEBUG: Link yang dibuat ->", verificationLink);
    await transporter.sendMail({
      from: `"Dashboard TIF UIN SUSKA" <cert.alisi@gmail.com>`,
      to: nim + "@students.uin-suska.ac.id",
      subject: "Verification Code",

      html: `
        <html>
            <head>
                <style>
                    .email-container {
                        width: 100%;
                        padding: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #f9f9f9;
                    }
                    .email-card {
                        width: 100%;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        font-family: Arial, sans-serif;
                    }
                    .email-header {
                        font-size: 20px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .email-body {
                        font-size: 16px;
                        line-height: 1.5;
                        margin-bottom: 30px;
                    }
                    .email-button {
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #4CAF50;
                        text-align: center;
                        text-decoration: none;
                        border-radius: 5px;
                        transition: background-color 0.3s ease;
                    }
                    .email-button:hover {
                        background-color: #298040;
                    }
                    .email-footer {
                        font-size: 14px;
                        color: #555;
                        text-align: center;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-card">
                        <div class="email-header">
                            📧 Aktivasi Kartu Kepengurusan 📧
                        </div>

                        <div class="email-body">
                            <h4><i>Halo Sobat TIF UIN Suska Riau,</i><span> 😁😉</span></h4>
                            <p>Terima kasih sebelumnya telah menggunakan absensi berbasis RFID. Silakan klik tombol di bawah ini ya untuk mengaktifkan kartu anda: 👇</p>
                            <p style="text-align: center;">
                                <a style="color: #ffffff; text-decoration: none" href="${verificationLink}" class="email-button">Login ke ABSENSI RFID TIF</a>
                            </p>
                            <p>Jika Anda tidak meminta email ini, abaikan saja. 😊</p>
                        </div>
                        <div class="email-footer">
                            Hormat kami,<br/>Tim Riau-DevOps, Aliansi Siber USR, & Inristek 2025
                        </div>
                    </div>
                </div>
            </body>
        </html>
        `,
    });

    return {
      response: true,
      message:
        "Kartu RFID berhasil dibuat, mas! Silahkan cek email kamu untuk aktivasi. 📧",
    };
  }

  public static async get(id: string) {
    const rfid = await KartuRfidRepository.findById(id);
    if (!rfid) {
      throw new APIError(
        "Waduh, Kartu RFID tidak ditemukan, mas!, silahkan registrasi 😭",
        404
      );
    }
    return rfid;
  }

  public static async absensi(rfid_id: string) {
    const rfid = await KartuRfidRepository.findById(rfid_id);
    if (!rfid) {
      throw new APIError("Waduh, Kartu RFID tidak ditemukan, mas! 😭", 404);
    }
    if (rfid.status === "PENDING") {
      throw new APIError("Waduh, Kartu RFID belum terverifikasi, mas! 😭", 400);
    }
    if (rfid.status === "NON_ACTIVE") {
      throw new APIError("Waduh, Kartu RFID sudah tidak aktif, mas! 😭", 400);
    }

    const existingAbsensiToday = await KartuRfidRepository.findAbsensiToday(
      rfid_id
    );
    if (existingAbsensiToday) {
      // Jika sudah ada, lempar error
      throw new APIError(
        "Kamu sudah melakukan absen hari ini, mas! Besok lagi yaa 😉",
        400
      );
    }

    const absensi_kartu = await KartuRfidRepository.absensi(rfid_id);
    
    return {
      response: true,
      message: "Absensi berhasil dilakukan, mas! ✅",
      data: absensi_kartu,
    };
  }

  public static async getAllAbsensi() {
    const all_absensi = await KartuRfidRepository.getAllAbsensi();
    return {
      response: true,
      message: "Berhasil mendapatkan daftar absensi, mas! ✅",
      data: all_absensi,
    };
  }

  public static async verify(id: string) {
    const rfid = await KartuRfidRepository.findById(id);
    if (!rfid) {
      throw new APIError("Waduh, Kartu RFID tidak ditemukan, mas! 😭", 404);
    }
    if (rfid.status === "ACTIVE") {
      return {
        response: true,
        message: "Kartu RFID ini sudah aktif, mas! ✅",
        data: rfid,
      };
    }

    const updatedRfid = await KartuRfidRepository.updateStatus(id, "ACTIVE");
    return {
      response: true,
      message: "Kartu RFID berhasil diverifikasi, mas! 🎉",
      data: rfid,
    };
  }
}
