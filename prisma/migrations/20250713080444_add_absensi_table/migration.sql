-- CreateTable
CREATE TABLE "absensi" (
    "id" SERIAL NOT NULL,
    "waktu_absen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rfid_id" VARCHAR(20) NOT NULL,

    CONSTRAINT "absensi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_rfid_id_fkey" FOREIGN KEY ("rfid_id") REFERENCES "kartu_rfid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
