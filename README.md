# Modern Personal Portfolio Website

A clean, responsive, and animated personal portfolio website built with pure frontend technologies: **vanilla HTML5, CSS3, and JavaScript**. Zero frameworks, zero build steps, and zero external runtime dependencies.

---

## 🌟 Features

- **Theme Toggle**: Seamless Dark and Light theme toggle with automatic persistence via `localStorage` and OS `prefers-color-scheme` synchronization.
- **Scroll Progress Bar**: Real-time progress indicator at the top of the viewport.
- **Sticky Navigation**: Glassmorphic header with smooth-scrolling section links and active section tracking.
- **Mobile Responsive Drawer**: Accessible hamburger menu with keyboard support (`Escape` to close) and backdrop tap closing.
- **Hero Typing Animation**: Dynamic cycling text with blinking caret and `prefers-reduced-motion` detection.
- **Animated Count-Up Statistics**: Smooth ease-out counter numbers triggered on viewport entry with `IntersectionObserver`.
- **Responsive Project Grid**: Multi-column project cards with subtle hover lift, tags, and action buttons.
- **Highlighted YouTube Showcase**: Dedicated card with interactive play button and channel metrics.
- **Interactive Social Network Links**: Brand-accented hover effects for YouTube, GitHub, LinkedIn, X / Twitter, Instagram, and Facebook.
- **Contact Form & Clipboard Utility**: Client-side validated form that opens pre-filled email client (`mailto:`) plus one-click "Copy Email" with instant tooltip feedback.
- **Performance & SEO Ready**: Semantic HTML5, Open Graph tags, Twitter Card metadata, responsive vector assets (`.svg`), and fast load times.

---

## 📂 File Structure

```text
portfolio/
├── index.html          # Main HTML5 structure and semantic sections
├── style.css           # Vanilla CSS with CSS variables, design tokens & media queries
├── script.js           # Vanilla JavaScript for animations, theme toggle & form handling
├── assets/             # Vector illustrations, icons, and favicon
│   ├── favicon.svg     # Monogram gradient browser favicon
│   ├── avatar.svg      # Developer avatar illustration
│   ├── project-1.svg   # DevFlow Studio project preview
│   ├── project-2.svg   # PulseAnalytics project preview
│   ├── project-3.svg   # CyberNexus UI project preview
│   ├── project-4.svg   # CloudStream Video project preview
│   └── youtube-cover.svg # YouTube channel showcase banner
└── README.md           # Project documentation and customization guide
```

---

## ✏️ How to Customize Your Content

All content is easily editable directly in `index.html` and `script.js`:

### 1. Personal Information & Bio
- Open `index.html` and search for `Jay Sambhu` to update your name.
- Update `<meta>` tags in the `<head>` section (author, description, title).
- Edit the bio text in the `#hero` and `#about` sections.

### 2. Typing Animation Roles
In `script.js`, locate the `roles` array:
```javascript
const roles = [
  'Web Developer',
  'Creative Designer',
  'Video Creator',
  'Problem Solver'
];
```
Add or change any roles you wish to cycle through.

### 3. Links & Social Media
Update `href` attributes in `index.html` under the `#social` and `#hero` sections:
- **YouTube**: `https://youtube.com/@yourchannel`
- **GitHub**: `https://github.com/yourusername`
- **LinkedIn**: `https://linkedin.com/in/yourprofile`
- **X / Twitter**: `https://x.com/yourhandle`
- **Instagram**: `https://instagram.com/yourhandle`
- **Facebook**: `https://facebook.com/yourprofile`

### 4. Projects
In `index.html` under `<section id="projects">`, modify or duplicate the `<article class="project-card">` elements:
- Change project titles, one-line descriptions, and badge tags.
- Update demo and source code `href` links.
- Replace SVG images in `assets/` with your own project screenshots.

### 5. Email & Contact Form
- In `index.html`, update `dellizulter@gmail.com` with your email.
- In `script.js`, update the `recipient` variable:
```javascript
const recipient = 'your-email@example.com';
```

---

## 🚀 Running Locally

No installation, Node.js, or compilation required!

### Option 1: Direct in Browser
Double-click `index.html` or drag it into any web browser.

### Option 2: Local HTTP Server (Python)
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server
Open the project in VS Code and click **Go Live** on the bottom status bar.

---

## 📄 License

This portfolio template is open source and available under the [MIT License](LICENSE).
