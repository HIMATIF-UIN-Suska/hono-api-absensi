/*
  Warnings:

  - Added the required column `kegiatan_id` to the `absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_jabatan` to the `mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "absensi" ADD COLUMN     "kegiatan_id" VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE "mahasiswa" ADD COLUMN     "id_jabatan" VARCHAR(11) NOT NULL;

-- CreateTable
CREATE TABLE "jabatan" (
    "id" VARCHAR(11) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,

    CONSTRAINT "jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kegiatan" (
    "id" VARCHAR(20) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "tanggal_mulai" TIMESTAMP(6) NOT NULL,
    "tanggal_selesai" TIMESTAMP(6) NOT NULL,
    "lokasi" VARCHAR(100) NOT NULL,

    CONSTRAINT "kegiatan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_id_jabatan_fkey" FOREIGN KEY ("id_jabatan") REFERENCES "jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_kegiatan_id_fkey" FOREIGN KEY ("kegiatan_id") REFERENCES "kegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
