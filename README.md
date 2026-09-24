# DeeTech WiFi — Email Backend (Phase 3 + Phase 9)

Sends an admin email whenever a customer taps "I've Paid" on the frontend.
This does NOT verify payment — real verification comes later from your
payment gateway's webhook (Phase 8).

## Setup

```
cd backend
npm install
```

Open `.env` and fill in the three empty values yourself:

```
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=where-you-want-to-receive-alerts@gmail.com
```

To get a Gmail App Password: Google Account → Security → 2-Step
Verification (must be on) → App Passwords → generate one for "Mail".
Do NOT use your normal Gmail login password here.

Never upload `.env` to GitHub.

## Run

```
npm start
```

Server starts on `http://localhost:5000` (or the PORT you set).

## Endpoint

```
POST /api/notify-payment
Content-Type: application/json

{
  "orderId": "WIFI-10245",
  "name": "Rahul Sharma",
  "mobile": "9800000000",
  "custId": "WIFI00123",
  "planName": "Weekly",
  "amount": 99
}
```

Wire the frontend's `API_BASE_URL` (in the app's script) to this server's
public URL once you deploy it (e.g. Railway/Render), and this call will
fire automatically when a customer taps "I've Paid".
