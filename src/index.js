import { words } from './words.js';

document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const textOutput = document.getElementById('text-output');

  // Initially hide the copy button
  copyBtn.style.display = 'none';

  // Lorem Ipsum generator function
  function generateLoremIpsum() {
    const numberOfWords = document.getElementById('number-of-words').value;

    let text = '';
    for (let j = 0; j < numberOfWords; j++) {
      text += words[Math.floor(Math.random() * words.length)] + ' ';
    }

    return `<p>${text}</p>`
  }

  // Event listener for the generate button
  generateBtn.addEventListener('click', () => {
    textOutput.innerHTML = generateLoremIpsum();
    copyBtn.style.display = 'inline-block'; // Show copy button
    copyBtn.textContent = 'Copy Text'; // Reset copy button text
  });

  clearBtn.addEventListener('click', () => {
    textOutput.innerHTML = '';
  });

  // Event listener for the copy button
  copyBtn.addEventListener('click', () => {
    const textToCopy = textOutput.textContent; // Use textContent to get raw text without HTML tags
    if (navigator.clipboard && textToCopy) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = 'Copy Text';
          }, 2000); // Reset text after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          // Fallback for older browsers or if clipboard API fails
          try {
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            copyBtn.textContent = 'Copied! (fallback)';
             setTimeout(() => {
              copyBtn.textContent = 'Copy Text';
            }, 2000);
          } catch (fallbackErr) {
            alert('Failed to copy text. Please copy manually.');
            console.error('Fallback copy failed: ', fallbackErr);
          }
        });
    } else if (!textToCopy) {
        alert('Nothing to copy!');
    } else {
        alert('Clipboard API not available. Please copy manually.');
    }
  });

  // Theme switcher functionality
  const themeSwitcherBtn = document.getElementById('theme-switcher-btn');
  const themeSwitcherKnob = document.getElementById('theme-switcher-knob'); // Added

  // Set initial theme and icon
  document.documentElement.setAttribute('data-bs-theme', 'light');
  if (themeSwitcherKnob) {
    themeSwitcherKnob.textContent = '🌙'; // Moon icon for light theme
  }

  themeSwitcherBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      if (themeSwitcherKnob) themeSwitcherKnob.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      if (themeSwitcherKnob) themeSwitcherKnob.textContent = '☀️';
    }
  });
});
