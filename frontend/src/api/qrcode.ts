import { apiClient } from "./client";
import type {GenerateQRCodePayload, QRCodeResponse} from "../types/qrcode";

export async function generateQRCode(payload: GenerateQRCodePayload): Promise<QRCodeResponse> {
    const response = await apiClient.post<QRCodeResponse>('/generate-qrcode', payload);
    return response.data;
}