const TARGET = 'https://thesunlight2010.github.io/void';

// Prefer location.replace so history isn't polluted
try {
  // small delay to allow screen to render briefly on slow connections
  setTimeout(() => {
    // Use replace to avoid back-button landing here
    location.replace(TARGET);
  }, 50);
} catch (e) {
  // fallback: set href on anchor so user can tap
  const a = document.getElementById('fallback');
  if (a) a.href = TARGET;
}