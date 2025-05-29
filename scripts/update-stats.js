const fs = require('fs');
const path = require('path');

// Read the README file
const readmePath = path.join(__dirname, '..', 'README.md');
let readmeContent = fs.readFileSync(readmePath, 'utf8');

// Get the token from environment variable
const token = process.env.STATS_TOKEN;

// Update the stats URLs with the token
const statsUrl = `https://github-readme-stats.vercel.app/api?username=lawrence908&show_icons=true&theme=radical&count_private=true&token=${token}`;
const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=lawrence908&layout=donut&theme=radical&count_private=true&token=${token}`;

// Replace the existing stats URLs
readmeContent = readmeContent.replace(
  /\[!\[GitHub Stats\].*?\]\(.*?\)/,
  `[![GitHub Stats](${statsUrl})](https://github.com/anuraghazra/github-readme-stats)`
);

readmeContent = readmeContent.replace(
  /\[!\[Top Langs\].*?\]\(.*?\)/,
  `[![Top Langs](${langsUrl})](https://github.com/anuraghazra/github-readme-stats)`
);

// Write the updated content back to README
fs.writeFileSync(readmePath, readmeContent); 