document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');
  const textOutput = document.getElementById('text-output');

  // Initially hide the copy button
  copyBtn.style.display = 'none';

  // Lorem Ipsum generator function
  function generateLoremIpsum() {
    const words = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
      'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
      'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
      'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
      'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis',
      'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros',
      'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa',
      'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus',
      'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus',
      'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam',
      'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in',
      'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque',
      'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis',
      'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada',
      'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam',
      'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat',
      'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante',
      'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae',
      'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl',
      'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu',
      'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra',
      'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae',
      'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu',
      'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis',
      'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis',
      'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam',
      'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi',
      'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus',
      'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus',
      'elementum', 'tempor', 'risus', 'cras'
    ];
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
