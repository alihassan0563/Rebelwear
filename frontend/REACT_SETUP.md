# REBELWEAR - React + Tailwind CSS Setup

Your website has been successfully converted to React with Tailwind CSS for better performance!

## 🚀 Quick Start

### Development Mode

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Start the React development server**:
   ```bash
   npm run dev
   ```
   The React app will run on `http://localhost:5173`

3. **Start the backend server** (in a separate terminal):
   ```bash
   npm run server:dev
   ```
   The backend API will run on `http://localhost:3000`

### Production Build

1. **Build the React app**:
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `dist` folder.

2. **Start the production server**:
   ```bash
   NODE_ENV=production npm run server
   ```
   The server will serve both the React app and API on port 3000.

## 📁 Project Structure

```
Rebelwear/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ImageSlider.jsx
│   │   └── ContactForm.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Streetwear.jsx
│   │   ├── Uniforms.jsx
│   │   └── ... (other pages)
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS styles
├── public/              # Static assets (images, etc.)
├── server.js            # Backend Express server
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Features

- ✅ **React 18** - Modern React with hooks
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **React Router** - Client-side routing
- ✅ **Vite** - Fast build tool and dev server
- ✅ **Optimized Performance** - Code splitting and lazy loading
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Image Sliders** - Interactive product galleries
- ✅ **Contact Form** - Integrated with backend API

## 🔧 Available Scripts

- `npm run dev` - Start Vite dev server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend server (port 3000)
- `npm run server:dev` - Start backend with nodemon (auto-reload)

## 📝 Notes

- The old HTML files are preserved (renamed to `index-old.html`, etc.)
- All images and assets are in the `public` folder (accessible via `/`)
- The backend API endpoints remain the same (`/api/contact`, `/api/health`)
- In development, React runs on port 5173 and backend on port 3000
- In production, everything runs on port 3000

## 🐛 Troubleshooting

**Port already in use?**
- Change the port in `vite.config.js` (for React) or `.env` (for backend)

**Images not loading?**
- Make sure image paths start with `/` (e.g., `/streetwear images/image.jpg`)
- Images should be in the `public` folder or root directory

**API not working?**
- Check that the backend server is running on port 3000
- Verify CORS settings in `server.js`
- Check browser console for errors

## 📧 Support

For issues or questions, contact: rebelwear40@gmail.com


