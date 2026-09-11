/* theme.js ──────────────────────────────────────────────────
   The toggle, and nothing else. The decision about which theme to START in is
   made by the inline script in <head>, because it has to happen before the
   first paint; by the time this file runs the page is already the right colour.

   What used to be here: a rule that went dark between 17:00 and 00:59 and light
   from 01:00 to 16:59 — so a visitor at 3am got a white page — and no reference
   at all to the device's own setting. Both are replaced by prefers-color-scheme,
   which already knows what time it is where they are.
------------------------------------------------------------------*/

const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const isDark = () => root.classList.contains('dark-theme');

function updateToggleText() {
  if (!themeToggle) return;
  themeToggle.textContent = isDark() ? '⏾' : '✹';
  themeToggle.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
}

function toggleTheme() {
  root.classList.toggle('dark-theme');
  try { localStorage.setItem('theme', isDark() ? 'dark' : 'light'); } catch (e) {}
  updateToggleText();
}

document.addEventListener('DOMContentLoaded', () => {
  updateToggleText();
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
});

// Someone who has never touched the toggle keeps following their device, even if
// it switches while the page is open. A stored choice is left alone.
osPrefersDark.addEventListener('change', (e) => {
  let stored = null;
  try { stored = localStorage.getItem('theme'); } catch (err) {}
  if (stored) return;
  root.classList.toggle('dark-theme', e.matches);
  updateToggleText();
});
