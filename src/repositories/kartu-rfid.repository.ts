import prisma from "../infrastructures/db.infrastructure";

export default class KartuRfidRepository {
  public static async create(id: string, nim: string) {
    return prisma.kartu_rfid.create({ data: { id, nim } });
  }
}
