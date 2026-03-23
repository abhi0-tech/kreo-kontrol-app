// Preload script - inject styles and clear button
console.log('Preload script loaded')

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  injectStyles()
  injectClearButton()
})

// Fallback if DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectStyles()
    injectClearButton()
  })
} else {
  injectStyles()
  injectClearButton()
}

function injectStyles() {
  const style = document.createElement('style')
  style.textContent = `
    /* Animated background effect - vibrant */
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.4; transform: scale(0.8); filter: blur(40px); }
      50% { opacity: 0.8; transform: scale(1.2); filter: blur(60px); }
    }
    
    @keyframes glow-pulse {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.5; }
    }
    
    @keyframes button-glow {
      0%, 100% { box-shadow: 0 0 10px rgba(168, 85, 247, 0.3), inset 0 0 10px rgba(168, 85, 247, 0.1); }
      50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.6), inset 0 0 20px rgba(168, 85, 247, 0.2); }
    }
    
    body {
      background: #0a0015;
      position: relative;
      overflow: hidden;
    }
    
    /* Main animated gradient background */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(-45deg, #1a003d, #3d0066, #1a0033, #2d0052, #0f0066);
      background-size: 400% 400%;
      animation: gradientShift 20s ease infinite;
      z-index: -2;
      pointer-events: none;
    }
    
    /* Central purple glow */
    body::after {
      content: '';
      position: fixed;
      top: 50%;
      left: 50%;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(147, 51, 234, 0.2) 30%, transparent 70%);
      transform: translate(-50%, -50%);
      animation: pulse-glow 6s ease-in-out infinite;
      pointer-events: none;
      z-index: 0;
      filter: blur(80px);
    }
    
    /* Left side glow */
    html::before {
      content: '';
      position: fixed;
      left: -10%;
      top: 40%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
      animation: glow-pulse 5s ease-in-out infinite;
      pointer-events: none;
      z-index: 0;
      filter: blur(60px);
    }
    
    /* Right side glow */
    html::after {
      content: '';
      position: fixed;
      right: -10%;
      top: 60%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%);
      animation: glow-pulse 5s ease-in-out infinite 0.5s;
      pointer-events: none;
      z-index: 0;
      filter: blur(60px);
    }
    
    /* Hide Three.js canvas - essential to show website content */
    canvas {
      display: none !important;
      pointer-events: none !important;
    }
    
    [data-engine="three.js r167"] {
      display: none !important;
      pointer-events: none !important;
    }
    
    /* Block the canvas container from intercepting clicks */
    div[style*="position: absolute"][style*="overflow: hidden"] {
      pointer-events: none !important;
    }
    
    /* Button styling - exclude dropdowns */
    button:not([role="menuitem"]):not([role="option"]) {
      background: rgba(168, 85, 247, 0.15) !important;
      backdrop-filter: blur(10px) !important;
      border: 1px solid rgba(168, 85, 247, 0.3) !important;
      box-shadow: 0 8px 32px rgba(168, 85, 247, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.1) !important;
      transition: all 0.3s ease !important;
      animation: button-glow 3s ease-in-out infinite !important;
      color: white !important;
      border-radius: 12px !important;
    }
    
    button:not([role="menuitem"]):not([role="option"]):hover {
      background: rgba(168, 85, 247, 0.25) !important;
      backdrop-filter: blur(15px) !important;
      box-shadow: 0 12px 48px rgba(168, 85, 247, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.2) !important;
      transform: translateY(-2px) !important;
    }
    
    /* Button focus/tab highlight effect */
    button:not([role="menuitem"]):not([role="option"]):focus,
    button:not([role="menuitem"]):not([role="option"]):focus-visible {
      background: rgba(168, 85, 247, 0.3) !important;
      backdrop-filter: blur(18px) !important;
      box-shadow: 0 0 0 2px rgba(10, 0, 21, 0.9), 0 0 0 4px rgba(168, 85, 247, 0.7), 0 0 20px rgba(168, 85, 247, 0.6), inset 0 1px 3px rgba(255, 255, 255, 0.2) !important;
      outline: none !important;
      transform: translateY(-1px) !important;
    }
    
    /* Input fields - liquid glass */
    input:not([role="listbox"]):not([role="menu"]),
    textarea:not([role="listbox"]):not([role="menu"]) {
      background: rgba(255, 255, 255, 0.05) !important;
      backdrop-filter: blur(10px) !important;
      border: 1px solid rgba(168, 85, 247, 0.2) !important;
      color: white !important;
      border-radius: 8px !important;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2) !important;
    }
    
    input:focus:not([role="listbox"]):not([role="menu"]),
    textarea:focus:not([role="listbox"]):not([role="menu"]) {
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(168, 85, 247, 0.5) !important;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(168, 85, 247, 0.2), 0 0 0 3px rgba(168, 85, 247, 0.15) !important;
      outline: 2px solid rgba(168, 85, 247, 0.6) !important;
      outline-offset: 0px !important;
    }
    
    /* Focus effects for all interactive elements */
    a:focus,
    a:focus-visible,
    [role="button"]:focus,
    [role="button"]:focus-visible {
      outline: 2px solid rgba(168, 85, 247, 0.6) !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2), 0 0 20px rgba(168, 85, 247, 0.6) !important;
    }
    
    /* Tab highlight glow effect - refined */
    *:focus-visible {
      outline: 2px solid rgba(168, 85, 247, 0.7) !important;
      outline-offset: 1px !important;
      box-shadow: 0 0 0 2px rgba(10, 0, 21, 0.9), 0 0 15px rgba(168, 85, 247, 0.5) !important;
    }
    
    /* Subtle glow for all focused elements */
    button:focus-visible,
    a:focus-visible,
    input:focus-visible,
    textarea:focus-visible {
      filter: brightness(1.1) !important;
    }
    
    /* Glowing text */
    h1, h2, h3, label {
      text-shadow: 0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.1) !important;
    }

    /* Simple Clear Data button */
    .clear-data-btn {
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 10px 16px;
      background: rgba(239, 68, 68, 0.2) !important;
      backdrop-filter: blur(10px) !important;
      color: white;
      border: 1px solid rgba(239, 68, 68, 0.4) !important;
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
      z-index: 100;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1) !important;
      transition: all 0.3s ease !important;
      animation: button-glow 3s ease-in-out infinite !important;
    }
    
    .clear-data-btn:hover {
      background: rgba(239, 68, 68, 0.4) !important;
      backdrop-filter: blur(15px) !important;
      box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2) !important;
      transform: translateY(-2px) !important;
    }
  `
  document.head.appendChild(style)
}

function injectClearButton() {
  // Wait for body to exist
  if (!document.body) {
    setTimeout(injectClearButton, 100)
    return
  }

  const clearBtn = document.createElement('button')
  clearBtn.className = 'clear-data-btn'
  clearBtn.textContent = 'Clear Data'
  clearBtn.id = 'clearDataBtn'
  
  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all app data (cookies, storage)?')) {
      localStorage.clear()
      sessionStorage.clear()
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
      })
      alert('Data cleared!')
      location.reload()
    }
  })
  
  document.body.appendChild(clearBtn)
}
