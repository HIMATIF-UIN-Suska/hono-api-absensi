import {z} from 'zod'

export const postMahasiswaSchema = z.object({
    nama: z.string(),
    email: z.string().email(),
    nip: z.string(),
})