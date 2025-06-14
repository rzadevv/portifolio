# Modern Dark Theme Portfolio Website

A sleek, interactive portfolio website with a dark theme and neon accents. Designed to showcase your professional skills, projects, and experience in a visually impressive way.

## Features

- **Dark Theme Design** with neon green accents and gradient effects
- **Interactive Elements** including custom cursor, smooth animations, and hover effects
- **Responsive Layout** that works on all devices from mobile to desktop
- **Advanced Animations** with AOS (Animate On Scroll) library
- **Custom Cursor** with interactive hover states
- **Parallax Effects** for enhanced visual experience
- **Project Showcase** with animated image overlays and tech stack icons
- **Experience Timeline** with visually distinct sections
- **Animated Stats Counter**
- **Glitch Text Effects** for a modern tech aesthetic
- **Grid Background** with subtle animation
- **Multi-language Support** built-in

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser to view the site
3. Replace placeholder images in the `img` folder with your own
4. Edit content in `index.html` to personalize the portfolio

## Customization

### Adding Your Content

Edit the following files to add your own information:

- `index.html`: Update personal information, project descriptions, and experience
- `img/`: Replace placeholder images with your own photos and project screenshots

### Changing Colors

The color scheme can be easily modified by editing the CSS variables in `css/style.css`:

```css
:root {
  --primary-color: #00E676;      /* Main accent color */
  --primary-hover: #00C853;      /* Hover state color */
  --secondary-color: #2979FF;    /* Secondary accent color */
  --accent-color: #00E5FF;       /* Additional accent color */
  --dark-bg: #111111;            /* Main background color */
  --darker-bg: #0a0a0a;          /* Darker sections color */
  --card-bg: #1a1a1a;            /* Card background color */
  --card-hover: #222222;         /* Card hover state color */
  /* ...other variables... */
}
```

### Adding Projects

To add a new project, copy and paste the project card HTML structure in the projects section:

```html
<div class="project-card" data-aos="fade-up">
  <div class="project-image">
    <img src="img/your-project-image.jpg" alt="Project Name">
    <div class="project-overlay">
      <div class="project-tech-icons">
        <span class="tech-icon"><i class="fab fa-icon-name"></i></span>
        <!-- Add more tech icons as needed -->
      </div>
      <a href="#" class="project-link">
        <i class="fas fa-external-link-alt"></i>
      </a>
    </div>
  </div>
  <div class="project-content">
    <h3>Project Name</h3>
    <p>Project description goes here.</p>
    <div class="project-links">
      <a href="#" class="btn btn-sm">Live Site</a>
      <a href="#" class="project-github"><i class="fab fa-github"></i></a>
    </div>
  </div>
</div>
```

## Technologies Used

- HTML5 & CSS3
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Space Mono, Poppins)
- AOS Animation Library

## Browser Compatibility

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Credits

- Font Awesome for icons
- AOS for scroll animations
- Google Fonts for typography
- Design inspiration from modern tech portfolios

## License

This project is open source and available under the [MIT License](LICENSE). 