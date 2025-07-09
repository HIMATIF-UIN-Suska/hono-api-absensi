-- CreateTable
CREATE TABLE "dosen" (
    "nip" VARCHAR(20) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "dosen_pkey" PRIMARY KEY ("nip")
);

-- CreateTable
CREATE TABLE "mahasiswa" (
    "nim" VARCHAR(11) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nip" VARCHAR(20) NOT NULL,

    CONSTRAINT "mahasiswa_pkey" PRIMARY KEY ("nim")
);

-- CreateIndex
CREATE UNIQUE INDEX "dosen_email_key" ON "dosen"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_email_key" ON "mahasiswa"("email");

-- AddForeignKey
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_nip_fkey" FOREIGN KEY ("nip") REFERENCES "dosen"("nip") ON DELETE NO ACTION ON UPDATE CASCADE;
