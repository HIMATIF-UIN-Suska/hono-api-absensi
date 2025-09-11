import CryptoHelper from "../helpers/crypto.helper";
import TimeHelper from "../helpers/time.helper";
import transporter from "../infrastructures/mail.infrastructure";
import KartuRFIDRepository from "../repositories/kartu-rfid.repository";
import { KegiatanRepository } from "../repositories/kegiatan.repository";
import { MahasiswaRepository } from "../repositories/mahasiswa.repository";
import { APIError } from "../utils/api-error.util";

export default class KartuRfidService {
  public static async post(id: string, nim: string) {
    // Check if the RFID already exists
    const existingRfid = await KartuRFIDRepository.findById(id);
    if (existingRfid) {
      throw new APIError("Waduh, Kartu RFID sudah terdaftar, mas!", 400);
    }

    const pengurus = await MahasiswaRepository.findByNIM(nim);
    if (!pengurus) {
      throw new APIError("Waduh, selain pengurus, dilarang daftar, mas!", 404);
    }

    await KartuRFIDRepository.create(id, nim);
    const encryptedPayload = CryptoHelper.generateEncryptedIDByPayload(id);

    const verificationLink = `${process.env.ACTIVATION_URL}?id=${encryptedPayload}`;

    await transporter.sendMail({
      from: `"HIMA-TIF UIN Suska Riau" <cert.alisi@gmail.com>`,
      to: nim + "@students.uin-suska.ac.id",
      subject: "Aktivasi Kartu RFID Inristek - HIMATIF UIN Suska Riau",

      html: `
        <!DOCTYPE html>
          <html lang="id">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Aktivasi Kartu RFID Kepengurusan</title>
              <!--[if !mso]><!-->
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
              <!--<![endif]-->
              <style>
                  body {
                      font-family: 'Inter', Arial, sans-serif;
                  }
                  @media screen and (max-width: 600px) {
                      .email-container {
                          width: 100% !important;
                          max-width: 100% !important;
                      }
                  }
              </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f4f7f6;">
              <center>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;" class="email-container">
                      <!-- Kartu Konten Email -->
                      <tr>
                          <td bgcolor="#ffffff" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); border-top: 4px solid #3B82F6;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <!-- Hero Image -->
                                  <tr>
                                      <td align="center" style="padding: 30px 0;">
                                          <img src="https://dashboard-hima.tif.uin-suska.ac.id/assets/Bordered-HIMATIF-Logo.png" alt="[Logo HIMA-TIF]" width="100" style="display: block; border: 0;">
                                      </td>
                                  </tr>

                                  <!-- Header -->
                                  <tr>
                                      <td align="center" style="padding: 0 30px 20px 30px; font-family: 'Inter', Arial, sans-serif; font-size: 20px; font-weight: 700; color: #1a202c;">
                                          Verifikasi HIMA-TIF e-Card
                                      </td>
                                  </tr>

                                  <!-- Body Konten -->
                                  <tr>
                                      <td style="padding: 0 16px; font-family: 'Inter', Arial, sans-serif; font-size: 15px; color: #4a5568; line-height: 1.6; text-align: center;">
                                          <p style="margin: 0 0 16px 0;">
                                              Halo Sobat HIMA-TIF UIN Suska Riau, 😁
                                          </p>
                                          <p style="margin: 0 0 15px 0;">
                                              Silahkan klik tombol di bawah untuk mengaktifkan kartu RFID anda.
                                          </p>

                                          <!-- Tombol Aksi (CTA) dengan Ikon -->
                                          <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                              <tr>
                                                  <td align="center">
                                                      <table border="0" cellspacing="0" cellpadding="0">
                                                          <tr>
                                                              <td align="center" style="border-radius: 8px; background-color: #3B82F6; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                                                                  <a href="${verificationLink}" target="_blank" style="font-size: 16px; font-family: 'Inter', Arial, sans-serif; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; padding: 10px 10px; display: inline-block;">
                                                                      <img src="https://img.icons8.com/ios-glyphs/30/fcf403/rfid-signal.png" alt="[Ikon RFID]" width="25" style="vertical-align: middle; margin-right: 3px; display: inline-block; color: #ffffff;"/>
                                                                      <span style="vertical-align: middle;">Aktifkan Kartu RFID</span>
                                                                  </a>
                                                              </td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>

                                          <p style="margin: 15px 0 0 0; font-size: 14px;">
                                              Jika Anda tidak meminta email ini, abaikan saja. 😊
                                          </p>
                                      </td>
                                  </tr>

                                  <!-- Garis Pemisah -->
                                  <tr>
                                      <td style="padding: 10px 0 20px 0;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                              <tr>
                                                  <td height="1" style="border-bottom: 1px solid #e2e8f0;"></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>

                                  <!-- Footer -->
                                  <tr>
                                      <td align="center" style="padding: 0 20px 30px 20px; font-family: 'Inter', Arial, sans-serif; font-size: 14px; color: #718096; line-height: 1.5;">
                                          Hormat kami,<br>
                                          <span style="font-weight: 600;">Tim Riau-DevOps, Aliansi Siber USR, & INRISTEK 2025</span>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </center>
          </body>
          </html>
        `,
    });

    return {
      response: true,
      message:
        "Kartu RFID berhasil terdaftar, brosis! Silahkan cek email dirimu untuk aktivasi.",
    };
  }

  public static async get(id: string) {
    const rfid = await KartuRFIDRepository.findById(id);
    if (!rfid) {
      throw new APIError(
        "Waduh, Kartu RFID dirimu kagak jumpa di-database, brosis!, kita daftarin dulu, yak!",
        404
      );
    }
    return rfid;
  }

  public static async absensi(rfid_id: string) {

    // 1. Validasi Kartu RFID (tetap sama)
    const rfid = await KartuRFIDRepository.findById(rfid_id);
    if (!rfid) {
      throw new APIError("Waduh, Kartu RFID tidak ditemukan, mas!", 404);
    }
    if (rfid.status !== "ACTIVE") {
      throw new APIError(
        `Kartu RFID-mu status-nya '${rfid.status}', brosis! Absen-mu kami tangguh-kan!`,
        400
      );
    }

    // 2. Cek apakah user sudah absen harian hari ini atau belum
    const existingAbsensiHarian = await KartuRFIDRepository.findAbsensiToday(
      rfid_id
    );
    if (existingAbsensiHarian) {
      throw new APIError(
        `Kamu sudah absen, brosis!`,
        400
      );
    }

    // 3. Kalau belum ada, buat absensi harian
    const absensi_kartu = await KartuRFIDRepository.absensi(
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
        await KartuRFIDRepository.findAbsensiByKegiatanToday(
          rfid_id,
          kegiatanHariIni.id // Gunakan ID kegiatan yang ditemukan
        );
  
      // 7. Jika belum absen kegiatam, catat absensi kegiatan baru
      if (!existingAbsensi) {
        await KartuRFIDRepository.absensi(
          rfid_id,
          kegiatanHariIni.id // Masukkan ID kegiatan secara otomatis
        );
        namaKegiatan = kegiatanHariIni.nama;
      }        
    }

    // 8. Kirim email ke pengurus untuk pemberitahuan sukses absensi
    const mahasiswa = await MahasiswaRepository.findByNIM(rfid.nim);
    await transporter.sendMail({
        from: `"HIMA-TIF UIN Suska Riau" <cert.alisi@gmail.com>`,
        to: rfid.nim + "@students.uin-suska.ac.id",
        subject: "Notifikasi Absensi RFID INRISTEK - HIMATIF UIN Suska Riau",

        html: `
            <html>
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Notifikasi Absensi</title>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
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
                      /* DIPERBARUI: Menggunakan line-height untuk vertical centering */
                      .header-icon {
                          width: 60px;
                          height: 60px;
                          background-color: #e8f5e9; /* Light green background for icon */
                          border-radius: 50%;
                          margin: 0 auto 15px;
                          text-align: center;
                          line-height: 60px; /* Vertically aligns content */
                          font-size: 0; /* Removes potential whitespace below image */
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
                      /* DIPERBARUI: Menghilangkan flex, karena layout dihandle oleh tabel di HTML */
                      .detail-item {
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
                      /* DIHAPUS: Class .detail-icon tidak lagi dibutuhkan */
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
                                  <!-- DIPERBARUI: Menambahkan vertical-align untuk kompatibilitas -->
                                  <img src="https://img.icons8.com/ios-glyphs/32/4CAF50/checkmark--v1.png" alt="Checkmark Icon" width="32" height="32" style="border:0; vertical-align: middle;">
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
                                  <!-- DIPERBARUI: Menggunakan tabel untuk layout yang andal -->
                                  <div class="detail-item">
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                              <td width="39" valign="middle">
                                                <img src="https://img.icons8.com/ios-glyphs/24/3498db/user-male-circle.png" alt="User Icon" width="24" height="24" style="border:0; display: block;">
                                              </td>
                                              <td valign="middle">
                                                  <div class="detail-text">
                                                      <span class="label">Nama Pengurus</span>
                                                      <span class="value">${mahasiswa!.nama}</span>
                                                  </div>
                                              </td>
                                          </tr>
                                      </table>
                                  </div>
                                  <!-- FIELD JABATAN DENGAN IKON BARU -->
                                  <div class="detail-item">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td width="39" valign="middle">
                                            <img src="https://img.icons8.com/material-outlined/24/3498db/identification-documents.png" alt="Position Icon" width="24" height="24" style="border:0; display: block;">
                                            </td>
                                            <td valign="middle">
                                                <div class="detail-text">
                                                    <span class="label">Jabatan Pengurus</span>
                                                    <span class="value">${mahasiswa!.jabatan.nama}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                  </div>
                                  <div class="detail-item">
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                              <td width="39" valign="middle">
                                                <img src="https://img.icons8.com/ios-filled/24/9b59b6/today.png" alt="Calendar Icon" width="24" height="24" style="border:0; display: block;">
                                              </td>
                                              <td valign="middle">
                                                  <div class="detail-text">
                                                      <span class="label">Nama Kegiatan</span>
                                                      <span class="value">${namaKegiatan}</span>
                                                  </div>
                                              </td>
                                          </tr>
                                      </table>
                                  </div>
                                  <div class="detail-item">
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                              <td width="39" valign="middle">
                                                  <img src="https://img.icons8.com/ios-filled/24/e67e22/clock.png" alt="Clock Icon" width="24" height="24" style="border:0; display: block;">
                                              </td>
                                              <td valign="middle">
                                                  <div class="detail-text">
                                                      <span class="label">Timestamp Absen</span>
                                                      <span class="value">${TimeHelper.getWibTimeString()}</span>
                                                  </div>
                                              </td>
                                          </tr>
                                      </table>
                                  </div>
                              </div>
                              
                              <p>Jika Anda merasa ada kesalahan, harap hubungi departemen INRISTEK. Terima kasih. 😊</p>
                          </div>

                          <div class="email-footer">
                              Hormat kami,<br/>Tim Riau-DevOps, Aliansi Siber USR, & INRISTEK 2025
                          </div>

                      </div>
                  </div>
              </body>
              </html>
          `,
    });

    return {
      response: true,
      message: "Absensi berhasil, brosis!",
      data: {
        ...absensi_kartu,
        kegiatan: namaKegiatan, // Sertakan nama kegiatan di response
      },
    };

  }

  public static async getAllAbsensi() {
    const all_absensi = await KartuRFIDRepository.getAllAbsensi();
    return {
      response: true,
      message: "Berhasil mendapatkan daftar absensi, mas! ✅",
      data: all_absensi,
    };
  }

  public static async verify(id: string) {
    const rfid = await KartuRFIDRepository.findById(id);
    if (!rfid) {
      throw new APIError("Waduh, Kartu RFID-mu kagak jumpa di-database, brosis!", 404);
    }
    if (rfid.status === "ACTIVE") {
      const pengurus = await MahasiswaRepository.findByNIM(rfid.nim!);
      return {
        response: true,
        message: "Kartu RFID Telah Aktif!",
        data: {
          ...rfid,
          nama: pengurus!.nama,
          jabatan: pengurus!.jabatan,
        },
      };
    }

    if (rfid.status === "NON_ACTIVE") {
      return {
        response: true,
        message: "Kartu RFID ini sudah di non-aktifkan, brosis!",
        data: rfid,
      };
    }

    const rfidUpdated = await KartuRFIDRepository.updateStatus(id, "ACTIVE");
    const pengurus = await MahasiswaRepository.findByNIM(rfidUpdated.nim!);
    return {
      response: true,
      message: "Kartu RFID Telah Aktif!",
      data: {
        ...rfidUpdated,
        nama: pengurus!.nama,
        jabatan: pengurus!.jabatan,
      },
    };
  }
}
