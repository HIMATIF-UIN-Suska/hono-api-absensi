import { GlobalServiceHealthResponse, GlobalServiceIntroduceResponse } from "../types/global.type"

export default class GlobalService {

    public static async introduce(): Promise<GlobalServiceIntroduceResponse> {
        return {
            'response': true,
            'message': 'Cihuy, Halow Semua 👋 ~ Selamat datang di API Absensi HIMATIF UIN Suska Riau! 🎉',
            'version': process.env.APP_VERSION || '1.0.0',
            'contributor': 'https://github.com/HIMATIF-UIN-Suska/hono-api-absensi',
            'timezone': `Asia/Jakarta ~ ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`
        }
    }

    public static async health(): Promise<GlobalServiceHealthResponse> {
        return {
            'response': true,
            'message': 'Cihuy, API Absensi HIMATIF UIN Suska Riau sehat-sehat saja! 😁',
            'status': 'OK',
            'uptime': process.uptime(),
            'memoryUsage': process.memoryUsage()
        }
    }

}