// Preload script - inject styles and clear button
console.log('Preload script loaded')

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  injectStyles()
  injectClearButton()
  injectRefreshButton()
  injectSettingsButton()
})

// Fallback if DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectStyles()
    injectClearButton()
    injectRefreshButton()
    injectSettingsButton()
  })
} else {
  injectStyles()
  injectClearButton()
  injectRefreshButton()
  injectSettingsButton()
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
      padding: 12px 20px;
      background: rgba(239, 68, 68, 0.2) !important;
      backdrop-filter: blur(10px) !important;
      color: white;
      border: 1px solid rgba(239, 68, 68, 0.4) !important;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
      z-index: 100;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1) !important;
      transition: all 0.3s ease !important;
      animation: button-glow 3s ease-in-out infinite !important;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 500;
      width: 140px;
    }

    .clear-data-btn svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
    
    .clear-data-btn:hover {
      background: rgba(239, 68, 68, 0.4) !important;
      backdrop-filter: blur(15px) !important;
      box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2) !important;
      transform: translateY(-2px) !important;
    }

    /* Settings button */
    .settings-btn {
      position: fixed;
      bottom: 20px;
      left: 332px;
      padding: 12px 20px;
      background: rgba(59, 130, 246, 0.2) !important;
      backdrop-filter: blur(10px) !important;
      color: white;
      border: 1px solid rgba(59, 130, 246, 0.4) !important;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
      z-index: 100;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1) !important;
      transition: all 0.3s ease !important;
      animation: button-glow 3s ease-in-out infinite !important;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 500;
      width: 140px;
    }

    .settings-btn:hover {
      background: rgba(59, 130, 246, 0.4) !important;
      backdrop-filter: blur(15px) !important;
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2) !important;
      transform: translateY(-2px) !important;
    }

    /* Refresh button */
    .refresh-btn {
      position: fixed;
      bottom: 20px;
      left: 176px;
      padding: 12px 20px;
      background: rgba(34, 197, 94, 0.2) !important;
      backdrop-filter: blur(10px) !important;
      color: white;
      border: 1px solid rgba(34, 197, 94, 0.4) !important;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
      z-index: 100;
      box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1) !important;
      transition: all 0.3s ease !important;
      animation: button-glow 3s ease-in-out infinite !important;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-weight: 500;
      width: 140px;
    }

    .refresh-btn svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .refresh-btn:hover {
      background: rgba(34, 197, 94, 0.4) !important;
      backdrop-filter: blur(15px) !important;
      box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2) !important;
      transform: translateY(-2px) !important;
    }

    .refresh-btn svg {
      animation: spin 0.6s linear;
    }

    .refresh-btn:active svg {
      animation: spin 0.6s linear;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* WebHID Modal */
    .webhid-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .webhid-modal {
      background: linear-gradient(135deg, rgba(30, 20, 60, 0.95) 0%, rgba(60, 30, 100, 0.95) 100%);
      border: 1px solid rgba(168, 85, 247, 0.3);
      border-radius: 16px;
      padding: 28px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(15px);
      animation: slideUp 0.3s ease;
    }

    .webhid-modal-title {
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 16px;
      text-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
    }

    .webhid-modal-subtitle {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 20px;
    }

    .device-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
      max-height: 300px;
      overflow-y: auto;
      padding-right: 8px;
    }

    .device-item {
      background: rgba(168, 85, 247, 0.1);
      border: 1px solid rgba(168, 85, 247, 0.2);
      border-radius: 8px;
      padding: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .device-item:hover {
      background: rgba(168, 85, 247, 0.2);
      border-color: rgba(168, 85, 247, 0.4);
      transform: translateX(4px);
    }

    .device-item input[type="radio"] {
      accent-color: rgba(168, 85, 247, 0.8);
      cursor: pointer;
    }

    .device-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .device-name {
      color: white;
      font-size: 13px;
      font-weight: 500;
    }

    .device-meta {
      color: rgba(255, 255, 255, 0.5);
      font-size: 11px;
    }

    .default-device-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      padding: 12px;
      background: rgba(168, 85, 247, 0.08);
      border-radius: 8px;
      border: 1px solid rgba(168, 85, 247, 0.15);
    }

    .default-device-checkbox label {
      color: rgba(255, 255, 255, 0.8);
      font-size: 13px;
      cursor: pointer;
      flex: 1;
    }

    .default-device-checkbox input[type="checkbox"] {
      accent-color: rgba(168, 85, 247, 0.8);
      cursor: pointer;
    }

    .webhid-modal-buttons {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .webhid-modal-button {
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid rgba(168, 85, 247, 0.3);
      background: rgba(168, 85, 247, 0.15);
      color: white;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .webhid-modal-button:hover {
      background: rgba(168, 85, 247, 0.25);
      box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
    }

    .webhid-modal-button.primary {
      background: rgba(168, 85, 247, 0.4);
      border-color: rgba(168, 85, 247, 0.6);
    }

    .webhid-modal-button.primary:hover {
      background: rgba(168, 85, 247, 0.6);
      box-shadow: 0 4px 16px rgba(168, 85, 247, 0.5);
    }

    .webhid-status {
      padding: 12px;
      border-radius: 8px;
      background: rgba(168, 85, 247, 0.1);
      border: 1px solid rgba(168, 85, 247, 0.2);
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      margin-bottom: 16px;
    }

    .webhid-status.loading {
      background: rgba(59, 130, 246, 0.1);
      border-color: rgba(59, 130, 246, 0.2);
      color: rgba(59, 130, 246, 0.8);
    }

    .webhid-status.error {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.2);
      color: rgba(239, 68, 68, 0.8);
    }

    .webhid-status.success {
      background: rgba(34, 197, 94, 0.1);
      border-color: rgba(34, 197, 94, 0.2);
      color: rgba(34, 197, 94, 0.8);
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
  clearBtn.id = 'clearDataBtn'
  
  // Add delete icon SVG
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('width', '24')
  svg.setAttribute('height', '24')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('viewBox', '0 0 24 24')
  
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', 'M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z')
  path.setAttribute('fill', '#ffffff')
  
  svg.appendChild(path)
  clearBtn.appendChild(svg)
  
  // Add text label
  const label = document.createElement('span')
  label.textContent = 'Clear Data'
  clearBtn.appendChild(label)
  
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

function injectRefreshButton() {
  // Wait for body to exist
  if (!document.body) {
    setTimeout(injectRefreshButton, 100)
    return
  }

  const refreshBtn = document.createElement('button')
  refreshBtn.className = 'refresh-btn'
  refreshBtn.id = 'refreshBtn'
  
  // Add refresh icon SVG (counterclockwise arrow with dashes)
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('width', '24')
  svg.setAttribute('height', '24')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('viewBox', '0 0 24 24')
  
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', 'M12 2.75c.658 0 1.302.069 1.923.2a1 1 0 1 1-.414 1.957 7.284 7.284 0 0 0-3.018 0 1 1 0 1 1-.414-1.957A9.283 9.283 0 0 1 12 2.75ZM6.25 4.754V4.25a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1h3a1 1 0 1 0 0-2h-.667c.152-.117.308-.227.469-.332A1 1 0 0 0 6.96 4.242c-.245.16-.483.33-.711.512Zm9.406-.22a1 1 0 0 1 1.383-.292 9.293 9.293 0 0 1 2.719 2.719 1 1 0 1 1-1.676 1.09 7.294 7.294 0 0 0-2.134-2.133 1 1 0 0 1-.292-1.383Zm4.208 4.772a1 1 0 0 1 1.186.771 9.283 9.283 0 0 1 0 3.846 1 1 0 1 1-1.957-.414 7.29 7.29 0 0 0 0-3.018 1 1 0 0 1 .771-1.185ZM3.75 10.25a1 1 0 0 1 1 1V12c0 .518.054 1.023.157 1.509a1 1 0 1 1-1.957.414A9.283 9.283 0 0 1 2.75 12v-.75a1 1 0 0 1 1-1Zm.785 5.406a1 1 0 0 1 1.383.292 7.294 7.294 0 0 0 2.134 2.134 1 1 0 0 1-1.091 1.676 9.293 9.293 0 0 1-2.719-2.719 1 1 0 0 1 .293-1.383Zm13.547.292a1 1 0 0 1 1.676 1.091 9.292 9.292 0 0 1-2.719 2.719 1 1 0 1 1-1.09-1.676 7.293 7.293 0 0 0 2.133-2.134Zm-4.573 3.145a1 1 0 1 1 .414 1.957 9.283 9.283 0 0 1-3.846 0 1 1 0 1 1 .414-1.957 7.29 7.29 0 0 0 3.018 0Z')
  path.setAttribute('fill', '#ffffff')
  
  svg.appendChild(path)
  refreshBtn.appendChild(svg)
  
  // Add text label
  const label = document.createElement('span')
  label.textContent = 'Refresh'
  refreshBtn.appendChild(label)
  
  refreshBtn.addEventListener('click', () => {
    console.log('[Refresh] Page refresh triggered')
    location.reload()
  })
  
  document.body.appendChild(refreshBtn)
}

function injectSettingsButton() {
  // Wait for body to exist
  if (!document.body) {
    setTimeout(injectSettingsButton, 100)
    return
  }

  const settingsBtn = document.createElement('button')
  settingsBtn.className = 'settings-btn'
  settingsBtn.id = 'settingsBtn'
  
  // Add settings icon SVG (gear icon)
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('width', '24')
  svg.setAttribute('height', '24')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('viewBox', '0 0 24 24')
  
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', 'M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1Zm0 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.5 9a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z')
  path.setAttribute('fill', '#ffffff')
  
  svg.appendChild(path)
  settingsBtn.appendChild(svg)
  
  // Add text label
  const label = document.createElement('span')
  label.textContent = 'Select Device'
  settingsBtn.appendChild(label)
  
  settingsBtn.addEventListener('click', showWebHIDModal)
  
  document.body.appendChild(settingsBtn)
}

// WebHID Modal Functions
function showWebHIDModal() {
  // Remove any existing modal
  const existingModal = document.getElementById('webhidModalOverlay')
  if (existingModal) existingModal.remove()

  const overlay = document.createElement('div')
  overlay.className = 'webhid-modal-overlay'
  overlay.id = 'webhidModalOverlay'

  const modal = document.createElement('div')
  modal.className = 'webhid-modal'

  // Title
  const title = document.createElement('div')
  title.className = 'webhid-modal-title'
  title.textContent = 'Select Device'
  modal.appendChild(title)

  // Subtitle
  const subtitle = document.createElement('div')
  subtitle.className = 'webhid-modal-subtitle'
  subtitle.textContent = 'Choose a connected device. Check "Set as default" to auto-connect next time.'
  modal.appendChild(subtitle)

  // Status message
  const statusDiv = document.createElement('div')
  statusDiv.className = 'webhid-status loading'
  statusDiv.textContent = '⏳ Scanning for connected devices...'
  statusDiv.id = 'webhidStatus'
  modal.appendChild(statusDiv)

  // Device list
  const deviceList = document.createElement('div')
  deviceList.className = 'device-list'
  deviceList.id = 'deviceList'
  modal.appendChild(deviceList)

  // Make default checkbox
  const checkboxContainer = document.createElement('div')
  checkboxContainer.className = 'default-device-checkbox'
  
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = 'setDefault'
  
  const label = document.createElement('label')
  label.htmlFor = 'setDefault'
  label.textContent = 'Set as default device (auto-connect)'
  
  checkboxContainer.appendChild(checkbox)
  checkboxContainer.appendChild(label)
  modal.appendChild(checkboxContainer)

  // Buttons
  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'webhid-modal-buttons'

  const cancelBtn = document.createElement('button')
  cancelBtn.className = 'webhid-modal-button'
  cancelBtn.textContent = 'Cancel'
  cancelBtn.addEventListener('click', () => overlay.remove())

  const connectBtn = document.createElement('button')
  connectBtn.className = 'webhid-modal-button primary'
  connectBtn.textContent = 'Connect'
  connectBtn.id = 'webhidConnectBtn'
  connectBtn.disabled = true

  buttonContainer.appendChild(cancelBtn)
  buttonContainer.appendChild(connectBtn)
  modal.appendChild(buttonContainer)

  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove()
  })

  // Load connected devices
  requestWebHIDDevices()

  // Connect button handler
  connectBtn.addEventListener('click', async () => {
    const selectedRadio = document.querySelector('input[name="device"]:checked')
    if (selectedRadio) {
      const deviceId = selectedRadio.value
      const deviceName = selectedRadio.dataset.name
      const setAsDefault = document.getElementById('setDefault').checked
      
      if (setAsDefault) {
        localStorage.setItem('webhid_default_device_id', deviceId)
        localStorage.setItem('webhid_default_device_name', deviceName)
        
        // Notify main process about default device
        try {
          const { ipcRenderer } = require('electron')
          await ipcRenderer.invoke('webhid:setDefaultDevice', deviceId, deviceName)
        } catch (e) {
          console.warn('[WebHID] Could not save default device to main process:', e)
        }
        
        statusDiv.className = 'webhid-status success'
        statusDiv.textContent = `✓ Default device set: ${deviceName}`
      } else {
        statusDiv.className = 'webhid-status success'
        statusDiv.textContent = `✓ Connected to ${deviceName}`
      }
      
      console.log(`[WebHID] Device selected: ${deviceName} (ID: ${deviceId})`)
      
      setTimeout(() => overlay.remove(), 1200)
    }
  })
}

async function requestWebHIDDevices() {
  try {
    // Check if WebHID is available
    if (!navigator.hid) {
      updateStatus('⚠️ WebHID not available in this browser', 'error')
      return
    }

    // Request device selection from user (opens native device picker)
    console.log('[WebHID] Requesting user to select device...')
    const devices = await navigator.hid.requestDevice({ filters: [] })
    
    if (devices.length === 0) {
      updateStatus('No device selected. Please choose a device.', 'error')
      return
    }

    // Deduplicate devices by vendor ID + product ID
    const uniqueDevices = []
    const seen = new Set()

    devices.forEach(device => {
      const key = `${device.vendorId}:${device.productId}`
      if (!seen.has(key)) {
        seen.add(key)
        uniqueDevices.push(device)
      }
    })

    console.log(`[WebHID] Found ${devices.length} device interface(s), ${uniqueDevices.length} unique device(s)`)
    displayDevices(uniqueDevices)
    updateStatus(`Found ${uniqueDevices.length} unique device(s). Select one to connect:`, 'success')
  } catch (error) {
    console.error('[WebHID] Error requesting devices:', error)
    if (error.name === 'NotFoundError') {
      updateStatus('No WebHID devices found. Connect a device and try again.', 'error')
    } else {
      updateStatus(`Error: ${error.message}`, 'error')
    }
  }
}

function displayDevices(devices) {
  const deviceList = document.getElementById('deviceList')
  deviceList.innerHTML = ''

  if (devices.length === 0) {
    deviceList.innerHTML = '<div style="color: rgba(255,255,255,0.5); padding: 20px; text-align: center;">No devices available</div>'
    return
  }

  const defaultDeviceId = localStorage.getItem('webhid_default_device_id')

  devices.forEach((device, index) => {
    const deviceItem = document.createElement('div')
    deviceItem.className = 'device-item'

    const radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'device'
    radio.value = device.deviceId || index
    radio.dataset.name = device.productName || `Device ${index + 1}`
    radio.dataset.vendorId = device.vendorId
    radio.dataset.productId = device.productId
    
    if (device.deviceId === defaultDeviceId || index === 0) {
      radio.checked = true
      enableConnectButton()
    }

    radio.addEventListener('change', enableConnectButton)

    const info = document.createElement('div')
    info.className = 'device-info'

    const name = document.createElement('div')
    name.className = 'device-name'
    name.textContent = device.productName || `Device ${index + 1}`
    info.appendChild(name)

    const meta = document.createElement('div')
    meta.className = 'device-meta'
    meta.textContent = `Vendor ID: 0x${device.vendorId.toString(16).padStart(4, '0')}, Product ID: 0x${device.productId.toString(16).padStart(4, '0')}`
    info.appendChild(meta)

    deviceItem.appendChild(radio)
    deviceItem.appendChild(info)
    deviceList.appendChild(deviceItem)
  })
}

function updateStatus(message, type = 'info') {
  const status = document.getElementById('webhidStatus')
  if (status) {
    status.textContent = message
    status.className = `webhid-status ${type}`
  }
}

function enableConnectButton() {
  const connectBtn = document.getElementById('webhidConnectBtn')
  if (connectBtn) {
    connectBtn.disabled = false
  }
}

// Export for main process access if needed
window.webhidAPI = {
  showModal: showWebHIDModal,
  getDefaultDevice: () => localStorage.getItem('webhid_default_device_id'),
  getDefaultDeviceName: () => localStorage.getItem('webhid_default_device_name'),
}
