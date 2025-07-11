export function generateOdpIcon(color = "#3b82f6") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="${color}">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
