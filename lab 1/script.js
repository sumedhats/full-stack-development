const themeBtn = document.getElementById('theme-btn');
const themeTitle = document.getElementById('theme-title');

themeBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Update root attribute
  document.documentElement.setAttribute('data-theme', newTheme);

  // Update UI text
  themeBtn.textContent = newTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
  themeTitle.textContent = `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Mode Theme`;
});