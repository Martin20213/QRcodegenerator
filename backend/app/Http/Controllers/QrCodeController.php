<?php

namespace App\Http\Controllers;

use App\Services\QrCodeService;
use App\Http\Requests\GenerateQrCodeRequest;

class QrCodeController extends Controller
{
    protected $qrCodeService;

    public function __construct(QrCodeService $qrCodeService)
    {
        $this->qrCodeService = $qrCodeService;
    }

    public function generate(GenerateQrCodeRequest $request)
    {
        $content = $request->validated()['content'];
        $qrCodeImage = $this->qrCodeService->generateQrCode($content);

        return response()->json(['qr_code' => $qrCodeImage]);
    }
}