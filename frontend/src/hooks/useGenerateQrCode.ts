import { useMutation } from '@tanstack/react-query';
import { generateQRCode } from '../api/qrcode';
import type { GenerateQRCodePayload, QRCodeResponse } from '../types/qrcode';

export function useGenerateQrCode() {
    return useMutation({
        mutationFn: (payload: GenerateQRCodePayload) => generateQRCode(payload),
    });
}
