# Troubleshooting Guide - Network Error Fix

## Issue: "Network error" when submitting contact form

### Quick Fixes:

1. **Make sure the backend server is running**
   ```bash
   npm run dev
   ```
   You should see: `🚀 REBELWEAR Backend Server running on port 3000`

2. **Create the .env file** (if not already created)
   
   Create a file named `.env` in the root directory with:
   ```
   PORT=3000
   EMAIL_USER=rebelwear40@gmail.com
   EMAIL_PASS=cxcq oqkw evvj ndoz
   CONTACT_EMAIL=rebelwear40@gmail.com
   ```
   **Important:** Remove any spaces after the `=` sign!

3. **Open the website correctly**
   
   **Option A: Use the backend server** (Recommended)
   - The server serves your HTML files
   - Open: `http://localhost:3000` in your browser
   
   **Option B: Use a local server**
   - Don't open the HTML file directly (file://)
   - Use VS Code Live Server extension
   - Or use Python: `python -m http.server 8000`
   - Then open: `http://localhost:8000`

4. **Check browser console**
   - Press F12 to open Developer Tools
   - Look for error messages in the Console tab
   - Check if you see: `✅ Backend connection successful!`

5. **Check server logs**
   - Look at the terminal where `npm run dev` is running
   - You should see logs when the form is submitted

### Common Issues:

#### Issue: "Cannot connect to server"
- **Solution:** Make sure `npm run dev` is running
- Check if port 3000 is already in use
- Try changing PORT in .env to 3001

#### Issue: "CORS error"
- **Solution:** The server already has CORS enabled
- Make sure you're accessing the site via http:// not file://

#### Issue: "Email authentication failed"
- **Solution:** Check your .env file
- Make sure EMAIL_PASS is your Gmail App Password (not regular password)
- Remove any spaces in the .env file

### Testing the Connection:

1. Open browser console (F12)
2. You should see: `✅ Backend connection successful!`
3. If you see a warning, the backend isn't reachable

### Manual Test:

Open this URL in your browser:
```
http://localhost:3000/api/test
```

You should see:
```json
{
  "success": true,
  "message": "Backend is working!",
  ...
}
```

If this works, the backend is running correctly!

### Still Having Issues?

1. Check Windows Firewall - it might be blocking port 3000
2. Try a different port (change PORT in .env)
3. Check if antivirus is blocking Node.js
4. Make sure Node.js is installed: `node --version`


