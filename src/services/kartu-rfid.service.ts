import CryptoHelper from "../helpers/crypto.helper";
import TimeHelper from "../helpers/time.helper";
import transporter from "../infrastructures/mail.infrastructure";
import KartuRfidRepository from "../repositories/kartu-rfid.repository";
import { KegiatanRepository } from "../repositories/kegiatan.repository";
import { MahasiswaRepository } from "../repositories/mahasiswa.repository";
import { APIError } from "../utils/api-error.util";

export default class KartuRfidService {
  public static async post(id: string, nim: string) {
    // Check if the RFID already exists
    const existingRfid = await KartuRfidRepository.findById(id);
    if (existingRfid) {
      throw new APIError("Waduh, Kartu RFID sudah ada, mas! 😭", 400);
    }

    const pengurus = await MahasiswaRepository.findByNIM(nim);
    if (!pengurus) {
      throw new APIError("Waduh, selain pengurus, dilarang daftar, mas! 😭", 404);
    }

    await KartuRfidRepository.create(id, nim);
    const encryptedPayload = CryptoHelper.generateEncryptedIDByPayload(id);

    const verificationLink = `${process.env.ACTIVATION_URL}/${encryptedPayload}`;

    await transporter.sendMail({
      from: `"HIMA-TIF UIN Suska Riau" <cert.alisi@gmail.com>`,
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
                            📧 Aktivasi Kartu RFID Kepengurusan 📧
                        </div>

                        <div class="email-body">
                            <h4><i>Halo Sobat HIMA-TIF UIN Suska Riau,</i><span> 😁😉</span></h4>
                            <p>Terima kasih sebelumnya telah menggunakan absensi berbasis RFID. Silakan klik tombol di bawah ini ya untuk mengaktifkan kartu RFID anda: 👇</p>
                            <p style="text-align: center;">
                                <a style="color: #ffffff; text-decoration: none" href="${verificationLink}" class="email-button">Aktifkan Kartu RFID HIMA-TIF</a>
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

    // 1. Validasi Kartu RFID (tetap sama)
    const rfid = await KartuRfidRepository.findById(rfid_id);
    if (!rfid) {
      throw new APIError("Waduh, Kartu RFID tidak ditemukan, mas! 😭", 404);
    }
    if (rfid.status !== "ACTIVE") {
      throw new APIError(
        `Kartu RFID ini berstatus ${rfid.status}, tidak bisa absen!`,
        400
      );
    }

    // 2. Cek apakah user sudah absen harian hari ini atau belum
    const existingAbsensiHarian = await KartuRfidRepository.findAbsensiToday(
      rfid_id
    );
    if (existingAbsensiHarian) {
      throw new APIError(
        `Kamu sudah absen harian/kegiatan hari ini, mas! 😉`,
        400
      );
    }

    // 3. Kalau belum ada, buat absensi harian
    const absensi_kartu = await KartuRfidRepository.absensi(
      rfid_id
    );

    // 4. Cari ada kegiatan apa saja yang sedang aktif hari ini
    const today = new Date(); // Mengambil tanggal dan waktu saat ini
    const kegiatanHariIni = await KegiatanRepository.findActiveByDate(today);
    let namaKegiatan = "Absensi Harian";

    // 5. Jika ada kegiatan, cek apakah user sudah absen untuk kegiatan tersebut atau belum
    if (kegiatanHariIni) {
    
      // 6. Jika ada kegiatan, Cek apakah user sudah absen untuk KEGIATAN SPESIFIK hari ini
      const existingAbsensi =
        await KartuRfidRepository.findAbsensiByKegiatanToday(
          rfid_id,
          kegiatanHariIni.id // Gunakan ID kegiatan yang ditemukan
        );
  
      // 7. Jika belum absen kegiatam, catat absensi kegiatan baru
      if (!existingAbsensi) {
        await KartuRfidRepository.absensi(
          rfid_id,
          kegiatanHariIni.id // Masukkan ID kegiatan secara otomatis
        );
        namaKegiatan = kegiatanHariIni.nama;
      }        
    }

    const mahasiswa = await MahasiswaRepository.findByNIM(rfid.nim);

    await transporter.sendMail({
        from: `"HIMA-TIF UIN Suska Riau" <cert.alisi@gmail.com>`,
        to: rfid.nim + "@students.uin-suska.ac.id",
        subject: "Verification Code",

        html: `
            <html>
              <head>
                  <style>
                      /* --- General Styles --- */
                      body {
                          margin: 0;
                          padding: 0;
                          background-color: #f7f8fa; /* A lighter, cleaner gray */
                          font-family: 'Poppins', Arial, sans-serif; /* Modern font */
                      }

                      /* --- Email Container --- */
                      .email-container {
                          width: 100%;
                          padding: 20px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          background: linear-gradient(to top right, #eef2f3, #f7f8fa); /* Subtle gradient background */
                          box-sizing: border-box;
                          min-height: 100vh;
                      }

                      /* --- Email Card --- */
                      .email-card {
                          width: 100%;
                          max-width: 600px;
                          background-color: #ffffff;
                          padding: 30px;
                          border-radius: 16px; /* More rounded corners */
                          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 5px 10px rgba(0, 0, 0, 0.02); /* Softer, layered shadow */
                          border: 1px solid #f0f0f0;
                          box-sizing: border-box;
                          transform: translateY(0);
                          transition: transform 0.3s ease;
                      }
                      .email-card:hover {
                          transform: translateY(-5px);
                      }

                      /* --- Header --- */
                      .email-header {
                          text-align: center;
                          margin-bottom: 25px;
                      }
                      .header-icon {
                          width: 60px;
                          height: 60px;
                          background-color: #e8f5e9; /* Light green background for icon */
                          border-radius: 50%;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          margin: 0 auto 15px;
                      }
                      .header-title {
                          font-size: 24px;
                          font-weight: 700;
                          color: #2c3e50; /* Darker, professional color */
                      }

                      /* --- Body --- */
                      .email-body {
                          font-size: 16px;
                          line-height: 1.7;
                          color: #5d6975;
                          margin-bottom: 30px;
                      }
                      .email-body p {
                          margin: 0 0 15px;
                      }
                      .greeting {
                          font-weight: 600;
                          color: #34495e;
                          margin-bottom: 15px;
                      }

                      /* --- Attendance Details Section --- */
                      .attendance-details {
                          margin: 25px 0;
                          padding: 0;
                          background-color: transparent;
                          border-left: none;
                          border-radius: 0;
                      }
                      .detail-item {
                          display: flex;
                          align-items: center;
                          padding: 15px;
                          background-color: #fdfdfd;
                          border: 1px solid #f0f0f0;
                          border-radius: 10px;
                          margin-bottom: 12px;
                          transition: background-color 0.3s ease;
                      }
                      .detail-item:hover {
                          background-color: #f9f9f9;
                      }
                      .detail-icon {
                          margin-right: 15px;
                          flex-shrink: 0;
                      }
                      .detail-text .label {
                          font-weight: 600;
                          color: #34495e;
                          display: block;
                          font-size: 13px;
                          margin-bottom: 2px;
                      }
                      .detail-text .value {
                          color: #2c3e50;
                          font-size: 16px;
                      }
                      
                      /* --- Footer --- */
                      .email-footer {
                          font-size: 13px;
                          color: #95a5a6; /* Lighter gray for footer */
                          text-align: center;
                          margin-top: 25px;
                          border-top: 1px solid #f0f0f0;
                          padding-top: 25px;
                      }
                  </style>
              </head>
              <body>
                  <div class="email-container">
                      <div class="email-card">
                          
                          <div class="email-header">
                              <div class="header-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                              </div>
                              <div class="header-title">
                                  Absensi Berhasil
                              </div>
                          </div>

                          <div class="email-body">
                              <p class="greeting">Halo Sobat HIMA-TIF UIN Suska Riau,</p>
                              <p>Terima kasih, absensi Anda telah berhasil kami catat. Berikut adalah rinciannya:</p>
                              
                              <!-- Data Absensi Ditampilkan di Sini -->
                              <div class="attendance-details">
                                  <div class="detail-item">
                                      <div class="detail-icon">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                      </div>
                                      <div class="detail-text">
                                          <span class="label">Nama Pengurus</span>
                                          <span class="value">${mahasiswa!.nama}</span>
                                      </div>
                                  </div>
                                  <div class="detail-item">
                                      <div class="detail-icon">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b59b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                      </div>
                                      <div class="detail-text">
                                          <span class="label">Nama Kegiatan</span>
                                          <span class="value">${namaKegiatan}</span>
                                      </div>
                                  </div>
                                  <div class="detail-item">
                                      <div class="detail-icon">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e67e22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                      </div>
                                      <div class="detail-text">
                                          <span class="label">Timestamp Absen</span>
                                          <span class="value">${TimeHelper.getWibTimeString()}</span>
                                      </div>
                                  </div>
                              </div>
                              
                              <p>Jika Anda merasa ada kesalahan, harap hubungi panitia. Terima kasih. 😊</p>
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
      message: "Absensi berhasil dilakukan, mas! ✅",
      data: {
        ...absensi_kartu,
        kegiatan: namaKegiatan, // Sertakan nama kegiatan di response
      },
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

    await KartuRfidRepository.updateStatus(id, "ACTIVE");
    return {
      response: true,
      message: "Kartu RFID berhasil diverifikasi, mas! 🎉",
      data: rfid,
    };
  }
}
