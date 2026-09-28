<template>
  <hr/>
  <div class="footer-container">
    <div class="footer-links">
      <a href="https://www.apache.org/licenses/" target="_blank" rel="noopener noreferrer">License</a>
      <span class="footer-separator">•</span>
      <a href="https://www.apache.org/security/" target="_blank" rel="noopener noreferrer">Security</a>
      <span class="footer-separator">•</span>
      <a href="https://privacy.apache.org/policies/privacy-policy-public.html" target="_blank" rel="noopener noreferrer">Privacy</a>
      <span class="footer-separator">•</span>
      <a href="https://www.apache.org/foundation/thanks.html" target="_blank" rel="noopener noreferrer">Thanks</a>
      <span class="footer-separator">•</span>
      <a href="https://www.apache.org/foundation/sponsorship.html" target="_blank" rel="noopener noreferrer">Sponsorship</a>
      <span class="footer-separator">•</span>
      <a href="https://events.apache.org/" target="_blank" rel="noopener noreferrer">Events</a>
      <span class="footer-separator">•</span>
      <a href="https://www.apache.org/foundation/" target="_blank" rel="noopener noreferrer">Foundation</a>
    </div>
    <div class="footer-copyright">
      <p>Copyright © 2025-2026 The Apache Software Foundation, Licensed under the Apache License, Version 2.0.</p>
      <p>Apache Auron and the Apache Auron logo are trademarks of The Apache Software Foundation.</p>
      <p>Apache, the names of Apache projects, and the feather logo are either registered trademarks or trademarks of the Apache Software Foundation in the United States and/or other countries. All other marks mentioned may be trademarks or registered trademarks of their respective owners.</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Footer separator line styling */
hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, #4a5568, transparent);
  margin: 3rem 0 0 0;
}

/* Main footer container */
.footer-container {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  border-top: 1px solid #4a5568;
  padding: 3rem 2rem 2rem;
  margin-top: 2rem;
  position: relative;
}

/* Add subtle pattern overlay */
.footer-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 20% 80%, rgba(107, 159, 255, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

/* Footer links section */
.footer-links {
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem 1rem;
  position: relative;
  z-index: 1;
}

.footer-links a {
  color: #6b9fff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.footer-links a:hover {
  color: #93c5fd;
  text-decoration: underline;
}

.footer-separator {
  color: #718096;
  font-size: 0.9rem;
}

/* Copyright section styling */
.footer-copyright {
  max-width: 80%;
  margin: 0 auto;
}

.footer-copyright p {
  color: #cbd5e0;
  font-size: 0.8rem;
  line-height: 1.6;
  margin: 0 0 0.8rem 0;
  padding: 0 1rem;
  text-align: justify;
  text-justify: inter-word;
}

.footer-copyright p:last-child {
  margin-bottom: 0;
}

/* Responsive design for tablets */
@media (max-width: 768px) {
  .footer-container {
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .footer-links {
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
  }

  .footer-links a {
    font-size: 0.85rem;
  }

  .footer-copyright p {
    font-size: 0.75rem;
    padding: 0 0.5rem;
    text-align: left;
  }
}

/* Responsive design for mobile devices */
@media (max-width: 480px) {
  hr {
    margin: 2rem 0 0 0;
  }

  .footer-container {
    padding: 2rem 1rem 1.5rem;
  }

  .footer-links {
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .footer-separator {
    display: none;
  }

  .footer-links a {
    font-size: 0.8rem;
  }

  .footer-copyright {
    max-width: 100%;
  }

  .footer-copyright p {
    font-size: 0.7rem;
    line-height: 1.5;
    padding: 0;
    margin-bottom: 1rem;
  }
}

/* Extra small devices */
@media (max-width: 360px) {
  .footer-container {
    padding: 1.5rem 0.8rem 1.2rem;
  }

  .footer-links a {
    font-size: 0.75rem;
  }

  .footer-copyright p {
    font-size: 0.65rem;
    line-height: 1.4;
  }
}

/* Light mode override (if user specifically prefers light mode) */
@media (prefers-color-scheme: light) {
  .footer-container {
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%) !important;
    border-top-color: #4a5568 !important;
  }

  .footer-copyright p {
    color: #a0aec0 !important;
  }

  hr {
    background: linear-gradient(90deg, transparent, #4a5568, transparent) !important;
  }
}

/* Print styles */
@media print {
  .footer-container {
    background: #f8f9fa !important;
    color: #333 !important;
    box-shadow: none !important;
    border-top: 1px solid #ccc;
  }

  .footer-container::before {
    display: none;
  }

  .footer-copyright p {
    color: #333 !important;
  }
}
</style>