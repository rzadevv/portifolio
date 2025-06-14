document.addEventListener('DOMContentLoaded', () => {
  // Matrix canvas setup
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Characters for the Matrix rain
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
  
  // Configuration
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  
  // Array to track the y position of each column
  const drops = [];
  
  // Initialize drops
  for (let i = 0; i < columns; i++) {
    // Random starting point for each column
    drops[i] = Math.random() * -100;
  }
  
  // Main animation function
  function draw() {
    // Semi-transparent black to create trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text style
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'center';
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      // Random character
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      
      // Calculate x position
      const x = i * fontSize;
      
      // Main bright character at the head
      ctx.fillStyle = primaryColor;
      ctx.fillText(text, x, drops[i]);
      
      // Dimmer character just behind
      ctx.fillStyle = accentColor;
      ctx.fillText(characters.charAt(Math.floor(Math.random() * characters.length)), 
                  x, drops[i] - fontSize);
      
      // Very dim characters for the trail
      ctx.fillStyle = 'rgba(0, 230, 118, 0.15)';
      ctx.fillText(characters.charAt(Math.floor(Math.random() * characters.length)), 
                  x, drops[i] - fontSize * 2);
      
      // Randomly reset some drops to top with some randomness to the start position
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = Math.random() * -100;
      }
      
      // Move the drop down
      drops[i] += 0.5 + Math.random() * 0.5;
    }
    
    // Call animation again
    requestAnimationFrame(draw);
  }
  
  // Start the animation
  draw();
  
  // Adjust density based on performance
  let frameCount = 0;
  let lastTime = performance.now();
  
  function checkPerformance() {
    const now = performance.now();
    const elapsed = now - lastTime;
    const fps = 1000 / (elapsed / frameCount);
    
    if (fps < 30 && drops.length > 20) {
      // Reduce density if performance is poor
      drops.length = Math.floor(drops.length * 0.7);
    }
    
    frameCount = 0;
    lastTime = now;
  }
  
  // Monitor performance every 5 seconds
  setInterval(checkPerformance, 5000);
}); 