# Ayush Khopatkar Portfolio

A modern, responsive portfolio website built with React, Vite, and Framer Motion.

## 🚀 Key Features

- **Responsive Design**: Works on all devices
- **Dark/Light Theme**: Toggle between themes
- **Smooth Animations**: Framer Motion powered
- **Dynamic Content**: Data-driven from `src/data.js`
- **Contact Form**: EmailJS integration
- **Modern UI**: Glass morphism, gradients, and smooth interactions

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Start dev server: `npm run dev`

### Building
- `npm run build` - Production build
- `npm run preview` - Preview production build

## 📝 Making Changes

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/Navigation.jsx`

### Updating Content
- **Profile Info**: Edit `src/data.js` → `profile` object
- **Projects**: Edit `src/data.js` → `projects` array
- **Skills**: Edit `src/data.js` → `skills` array
- **Education/Experience**: Edit `src/data.js` → `education` & `experience` arrays

### Styling
- **Global Styles**: `src/index.css`
- **Component Styles**: `src/App.css`
- **Custom Properties**: CSS variables in `:root`

### Adding New Components
1. Create in `src/`
2. Import and use in relevant pages
3. Add styles to `src/App.css`

## 🎨 Customization

### Colors & Themes
Edit CSS variables in `src/index.css`:
```css
:root {
  --accent: #7c8cff;
  --accent-2: #22d3ee;
  --accent-3: #a78bfa;
  --card: rgba(255,255,255,0.06);
  --border: rgba(124,140,255,0.25);
}
```

### Animations
Modify Framer Motion props in page components:
```jsx
<motion.section 
  initial={{ opacity: 0, y: 12 }} 
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

## 📱 Responsive Breakpoints

- **Mobile**: < 720px
- **Tablet**: 720px - 1024px  
- **Desktop**: > 1024px

## 🔧 Troubleshooting

### Common Issues
1. **EmailJS not working**: Check `.env.local` credentials
2. **Styles not loading**: Ensure `src/App.css` is imported
3. **Build errors**: Check for missing imports or syntax errors

### Performance
- Images are optimized and lazy-loaded
- CSS uses modern properties with fallbacks
- Animations respect `prefers-reduced-motion`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ by Ayush Khopatkar
