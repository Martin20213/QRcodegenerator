import { useState } from 'react';
import { useGenerateQrCode } from '../hooks/useGenerateQrCode';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('');
  const { mutate, data, error, isPending } = useGenerateQrCode();

  const handleGenerate = () => {
    if (!text.trim()) return;
    mutate({ content: text });
  };

  const handleDownload = () => {
    if (!data?.qr_code) return;
    const link = document.createElement('a');
    link.href = data.qr_code;
    link.download = 'qrcode.png';
    link.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleGenerate();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            QR Code Generator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Generálj QR kódot bármilyen szövegből vagy URL-ből
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
            Tartalom
          </label>
          <input
            id="content"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />

          {error && (
            <p className="text-red-400 text-sm mt-2">
              Hiba történt a QR kód generálása közben.
            </p>
          )}

          <button
            onClick={handleGenerate}
            disabled={isPending || !text.trim()}
            className="w-full mt-4 bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer transition"
          >
            {isPending ? 'Generálás...' : 'QR kód generálása'}
          </button>

          {data?.qr_code && (
            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col items-center">
              <div className="bg-white p-3 rounded-xl">
                <img src={data.qr_code} alt="Generated QR Code" className="w-48 h-48" />
              </div>
              <button
                onClick={handleDownload}
                className="mt-4 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                Letöltés PNG-ként
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}