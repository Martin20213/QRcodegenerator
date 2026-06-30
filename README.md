# QR Code Generator

A simple and modern QR Code Generator built with Laravel, React, and TypeScript.
Generate QR codes instantly from any text or URL and download them as PNG images.

## Screenshots
<img width="1682" height="821" alt="image" src="https://github.com/user-attachments/assets/19521a31-4f95-41ca-bdf8-2a1347cc185f" />
<img width="1260" height="818" alt="image" src="https://github.com/user-attachments/assets/afb144cc-174f-4399-83c2-5ca971e1cfd4" />


## Features

* Generate QR codes from text or URLs
* Instant preview
* Download QR code as PNG
* Input validation
* Clean and responsive user interface

## Tech Stack

### Backend

* Laravel
* PHP
* REST API
* Layered architecture (Form Request → Service → Controller)

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS v4
* TanStack React Query

### Libraries

* [`endroid/qr-code`](https://github.com/endroid/qr-code) — QR code generation (PHP, requires the GD extension)
* `axios` — HTTP client
* `@tanstack/react-query` — async state management

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Martin20213/qrcodegenerator.git
cd qrcodegenerator
```

### Backend

```bash
cd backend

composer install

cp .env.example .env

php artisan key:generate

php artisan install:api   # registers routes/api.php if not already present

php artisan serve
```

> **Note:** `endroid/qr-code` requires the PHP **GD extension** to be enabled.
> In `php.ini`, uncomment:
> ```ini
> extension=gd
> ```
> then restart `php artisan serve`. Verify with `php -m | grep gd` (or `findstr gd` on Windows).

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Create a `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:8000/api
```

## Project Structure

```
backend/
  app/
    Http/
      Controllers/
        QrCodeController.php      # thin controller, delegates to the service
      Requests/
        GenerateQrCodeRequest.php # validation
    Services/
      QrCodeService.php           # QR generation logic
  routes/
    api.php                      # POST /api/generate-qrcode

frontend/
  src/
    api/
      client.ts                  # axios instance
      qrcode.ts                  # raw API call
    hooks/
      useGenerateQrCode.ts       # React Query mutation, async state
    pages/
      QrCodeGeneratorPage.tsx    # UI
    types/
      qrcode.ts                  # shared TS interfaces
```

The project follows a layered pattern on both sides:

* **Backend:** `Request` (validation) → `Service` (business logic) → `Controller` (HTTP glue)
* **Frontend:** `types` (data shape) → `api` (fetching) → `hooks` (async state + logic) → `pages` (rendering)

This keeps each layer independently testable and makes the QR generation logic portable — the `QrCodeService` + `GenerateQrCodeRequest` + controller + route can be dropped into another Laravel project with minimal changes, same for the frontend `api`/`hooks` pair.

## API

### `POST /api/generate-qrcode`

**Request body:**

```json
{
  "content": "https://example.com"
}
```

**Response:**

```json
{
  "qr_code": "data:image/png;base64,...."
}
```

**Validation:**

* `content` — required, string, max 2000 characters

## Future Improvements

* Custom QR size
* Custom colors
* SVG export
* QR history
* Dark mode toggle
* Copy generated content
* Rate limiting on the endpoint
* Extract a reusable `QrCodeService` into a standalone Composer package

## Learning Goals

This project was created to practice:

* Laravel API development with a layered (Request/Service/Controller) structure
* React with TypeScript
* Async state management with React Query
* Frontend and backend integration
* API communication
* Component-based architecture
* Clean project structure
* Debugging real-world dependency/environment issues (library version mismatches, missing PHP extensions)

## License

This project is available under the MIT License.
