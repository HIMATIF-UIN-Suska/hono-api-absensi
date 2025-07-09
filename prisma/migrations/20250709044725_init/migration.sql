-- CreateEnum
CREATE TYPE "type_status_kartu_rfid" AS ENUM ('PENDING', 'ACTIVE', 'NON_ACTIVE');

-- CreateTable
CREATE TABLE "mahasiswa" (
    "nim" VARCHAR(11) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "email" VARCHAR(36) NOT NULL,

    CONSTRAINT "pk_nim_mahasiswa" PRIMARY KEY ("nim")
);

-- CreateTable
CREATE TABLE "kartu_rfid" (
    "id" VARCHAR(20) NOT NULL,
    "status" "type_status_kartu_rfid" NOT NULL DEFAULT 'PENDING',
    "nim" VARCHAR(11) NOT NULL,

    CONSTRAINT "pk_id_kartu_rfid" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_email_key" ON "mahasiswa"("email");

-- AddForeignKey
ALTER TABLE "kartu_rfid" ADD CONSTRAINT "fk_nim_kartu_rfid" FOREIGN KEY ("nim") REFERENCES "mahasiswa"("nim") ON DELETE NO ACTION ON UPDATE CASCADE;
