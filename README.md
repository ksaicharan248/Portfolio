# Elite Dark Portfolio - React Version

A modern, responsive portfolio website built with React and Vite, featuring stunning animations, dark/light theme toggle, and a professional design.

## 🚀 Features

- **React 18** with modern hooks and components
- **Vite** for fast development and optimized builds
- **Framer Motion** for smooth animations
- **Responsive Design** that works on all devices
- **Dark/Light Theme** toggle
- **Particle Background** animations
- **Custom Cursor** effects
- **Contact Form** with email integration
- **Resume Download** functionality
- **Modern UI/UX** with glassmorphism effects

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Framer Motion
- Lucide React (Icons)
- React Router DOM
- React Intersection Observer

### Backend
- Node.js
- Express.js
- Nodemailer
- Helmet (Security)
- CORS
- Rate Limiting

### Development
- Concurrently (Run frontend and backend together)
- Nodemon (Auto-restart server)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ksaicharan248/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your actual values:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=3000
   NODE_ENV=development
   ```

## 🏃‍♂️ Running the Project

### Development Mode
Run both frontend (Vite) and backend (Express) concurrently:
```bash
npm start
```

This will start:
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:3000 (Express API server)

### Individual Commands

**Frontend only** (React with Vite):
```bash
npm run dev
```

**Backend only** (Express server):
```bash
npm run server:dev
```

**Production server only**:
```bash
npm run server
```

## 🏗️ Building for Production

1. **Build the React app**:
   ```bash
   npm run build
   ```

2. **Preview the production build**:
   ```bash
   npm run preview
   ```

3. **Deploy**: Set `NODE_ENV=production` and run:
   ```bash
   NODE_ENV=production npm run server
   ```

### Frontend
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Advanced animations and responsive design
- **JavaScript ES6+**: Modern JavaScript with classes
- **Canvas API**: Particle system implementation

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **Nodemailer**: Email sending functionality
- **Helmet**: Security middleware

### Additional Libraries
- **Font Awesome**: Icon library
- **Google Fonts**: Typography (Inter & JetBrains Mono)
- **Express Rate Limit**: API rate limiting
- **CORS**: Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ksaicharan248/Elite-Dark-Portfolio.git
   cd Elite-Dark-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Email Configuration
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
Elite-Dark-Portfolio/
├── 📄 index.html              # Main HTML file
├── 🎨 elite-styles.css        # Main stylesheet
├── ⚡ elite-script.js         # Main JavaScript file
├── 🖥️ server.js              # Express server
├── 📦 package.json           # Dependencies and scripts
├── 📚 README.md              # Documentation
├── 🔧 .env                   # Environment variables
│
├── 📂 api/
│   ├── 📧 contact.js         # Contact form API
│   └── 📄 download.js        # Resume download API
│
└── 📂 assets/
    └── 📄 resume.pdf         # Resume file (add your own)
```

## 🎯 Key Sections

### 1. **Hero Section**
- Dynamic typing animation
- Animated statistics
- Floating tech icons
- Call-to-action buttons
- Social media links

### 2. **About Section**
- Professional overview
- Highlight cards with animations
- Skills and expertise showcase

### 3. **Experience Section**
- Timeline layout
- Company logos
- Technology tags
- Detailed descriptions

### 4. **Education Section**
- Academic timeline
- Degree information
- CGPA/Grade display
- Key coursework
- Academic achievements
- Technical focus areas

### 5. **Skills Section**
- Categorized skill display
- Interactive skill categories
- Animated progress bars
- Technology icons

### 5. **Projects Section**
- Featured project showcase
- Hover animations
- Technology badges
- Project status indicators
- External links

### 6. **Contact Section**
- Working contact form
- Real-time validation
- Email notifications
- Social media integration

## ⚙️ Configuration

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Add credentials to `.env` file

### Customization
1. **Personal Information**: Update content in `index.html`
2. **Colors**: Modify CSS variables in `:root` selector
3. **Animation Speed**: Adjust transition durations in CSS
4. **Particle Count**: Change particle count in JavaScript

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the entire folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Traditional Hosting
1. Build the project
2. Upload files to your web server
3. Configure environment variables

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🔒 Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: Contact form protection
- **Input Validation**: Form data sanitization
- **CORS**: Cross-origin request handling
- **Content Security Policy**: XSS protection

## 🎨 Design Philosophy

### Color Palette
- **Primary**: #667eea (Modern Blue)
- **Secondary**: #f5576c (Vibrant Pink)
- **Accent**: #00f2fe (Electric Cyan)
- **Dark**: #0c0c0c (Deep Black)
- **Light**: #ffffff (Pure White)

### Typography
- **Headings**: Inter (Modern, Clean)
- **Code**: JetBrains Mono (Developer-focused)
- **Body**: Inter (Readable, Professional)

### Animation Principles
- **Easing**: Custom cubic-bezier curves
- **Duration**: Contextual timing (200ms - 500ms)
- **Staging**: Staggered animations for visual hierarchy
- **Purpose**: Every animation serves a functional purpose

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern portfolio trends and UI/UX best practices
- **Icons**: Font Awesome and Devicons
- **Fonts**: Google Fonts
- **Color Palette**: Carefully selected for accessibility and aesthetics

## 📞 Contact

**Sai Charan K**
- 📧 Email: saicharanreddy141458@gmail.com
- 💼 LinkedIn: [linkedin.com/in/sai-charan-k-21940924a](https://linkedin.com/in/sai-charan-k-21940924a)
- 📱 Phone: +91 9014145839
- 🌐 Portfolio: [Your Portfolio URL]

---

**⭐ If you found this portfolio impressive, please give it a star!**

Built with ❤️ by Sai Charan K | © 2025 All Rights Reserved
