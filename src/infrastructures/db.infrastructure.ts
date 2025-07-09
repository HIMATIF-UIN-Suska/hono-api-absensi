import { Prisma, PrismaClient } from "../generated/prisma";
import { DefaultArgs } from "../generated/prisma/runtime/library";

const prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = new PrismaClient();

export default prisma;