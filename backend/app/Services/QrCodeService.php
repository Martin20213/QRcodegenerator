<?php

namespace App\Services;

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Writer\PngWriter;

class QrCodeService
{
    public function generateQrCode(string $content): string
    {
        $result = Builder::create()
            ->writer(new PngWriter())
            ->data($content)
            ->encoding(new Encoding('UTF-8'))
            ->errorCorrectionLevel(ErrorCorrectionLevel::High)
            ->size(300)
            ->margin(10)
            ->build();

        return 'data:image/png;base64,' . base64_encode($result->getString());
    }
}