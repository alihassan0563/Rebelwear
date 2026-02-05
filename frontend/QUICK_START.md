# Quick Start Guide - REBELWEAR Backend

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Email
1. Copy `env.example.txt` to `.env`
2. Open `.env` and add your email credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   CONTACT_EMAIL=rebelwear40@gmail.com
   ```

**For Gmail Users:**
- Enable 2-Step Verification in your Google Account
- Go to [App Passwords](https://myaccount.google.com/apppasswords)
- Generate a new app password for "Mail"
- Use that 16-character password (not your regular password)

### Step 3: Start the Server
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## ✅ Test It

1. Open your website in a browser
2. Fill out the contact form
3. Submit it
4. Check your email inbox for the inquiry
5. The customer will receive a confirmation email automatically

## 📝 What's Included

- ✅ Contact form API endpoint
- ✅ Email notifications (to you and customer)
- ✅ Form validation
- ✅ Error handling
- ✅ Beautiful notification system
- ✅ CORS enabled

## 🔧 Troubleshooting

**Email not working?**
- Make sure you're using an App Password (Gmail)
- Check `.env` file has correct credentials
- Verify 2-Step Verification is enabled (Gmail)

**Port already in use?**
- Change `PORT=3000` to another port in `.env`
- Update the API_URL in `script.js` if needed

## 📧 Need Help?

Contact: rebelwear40@gmail.com

