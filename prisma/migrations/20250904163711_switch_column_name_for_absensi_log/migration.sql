/*
  Warnings:

  - You are about to drop the column `kegiatan_id` on the `absensi` table. All the data in the column will be lost.
  - You are about to drop the column `rfid_id` on the `absensi` table. All the data in the column will be lost.
  - Added the required column `id_rfid` to the `absensi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "absensi" DROP CONSTRAINT "absensi_kegiatan_id_fkey";

-- DropForeignKey
ALTER TABLE "absensi" DROP CONSTRAINT "absensi_rfid_id_fkey";

-- AlterTable
ALTER TABLE "absensi" DROP COLUMN "kegiatan_id",
DROP COLUMN "rfid_id",
ADD COLUMN     "id_kegiatan" VARCHAR(20),
ADD COLUMN     "id_rfid" VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_id_rfid_fkey" FOREIGN KEY ("id_rfid") REFERENCES "kartu_rfid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_id_kegiatan_fkey" FOREIGN KEY ("id_kegiatan") REFERENCES "kegiatan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
