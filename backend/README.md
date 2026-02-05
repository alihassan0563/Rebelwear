# REBELWEAR - Backend Setup Guide

This guide will help you set up the backend server for the REBELWEAR website.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A Gmail account (or other email service) for sending emails

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file in the root directory (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your email credentials:
   ```
   PORT=3000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=rebelwear40@gmail.com
   ```

3. **Gmail App Password Setup** (if using Gmail)
   
   For Gmail, you need to use an "App Password" instead of your regular password:
   
   - Go to your Google Account settings
   - Enable 2-Step Verification (if not already enabled)
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Generate a new app password for "Mail"
   - Use this 16-character password in your `.env` file

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints

### POST `/api/contact`
Submit contact form inquiries.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "inquiry": "custom",
  "message": "I'm interested in custom designs..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your inquiry has been sent successfully!"
}
```

### GET `/api/health`
Health check endpoint to verify the server is running.

## Features

- ✅ Contact form submission with email notifications
- ✅ Automatic confirmation emails to customers
- ✅ Form validation (client-side and server-side)
- ✅ Error handling and user-friendly notifications
- ✅ CORS enabled for frontend integration
- ✅ Secure environment variable configuration

## Frontend Integration

The frontend JavaScript (`script.js`) automatically detects the environment:
- **Local development**: Uses `http://localhost:3000/api/contact`
- **Production**: Uses `/api/contact` (relative URL)

Make sure your frontend and backend are on the same domain in production, or configure CORS appropriately.

## Deployment

### Option 1: Deploy Backend Separately
- Deploy backend to services like Heroku, Railway, Render, or DigitalOcean
- Update the API_URL in `script.js` to point to your backend URL

### Option 2: Full Stack Deployment
- Deploy both frontend and backend together
- Use services like Vercel, Netlify (with serverless functions), or a VPS

## Troubleshooting

### Email Not Sending
1. Verify your email credentials in `.env`
2. For Gmail, ensure you're using an App Password, not your regular password
3. Check that 2-Step Verification is enabled (for Gmail)
4. Check server logs for error messages

### CORS Errors
- Ensure CORS is properly configured in `server.js`
- Check that your frontend URL is allowed in CORS settings

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the port: `lsof -ti:3000 | xargs kill`

## Support

For issues or questions, contact: rebelwear40@gmail.com

