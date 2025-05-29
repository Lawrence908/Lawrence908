const fs = require('fs');
const path = require('path');

console.log('Starting stats update script...');

// Read the README file
const readmePath = path.join(__dirname, '..', 'README.md');
let readmeContent = fs.readFileSync(readmePath, 'utf8');
console.log('Successfully read README.md');

// Get the token from environment variable
const token = process.env.STATS_TOKEN;
if (!token) {
  console.error('Error: STATS_TOKEN environment variable is not set');
  process.exit(1);
}
console.log('Token found in environment variables');

// Update the stats URLs with the token
const statsUrl = `https://github-readme-stats.vercel.app/api?username=lawrence908&show_icons=true&theme=radical&count_private=true&token=${token}`;
const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=lawrence908&layout=donut&theme=radical&count_private=true&token=${token}`;
console.log('Generated new stats URLs');

// Replace the existing stats URLs
const oldContent = readmeContent;
readmeContent = readmeContent.replace(
  /\[!\[GitHub Stats\].*?\]\(.*?\)/,
  `[![GitHub Stats](${statsUrl})](https://github.com/anuraghazra/github-readme-stats)`
);

readmeContent = readmeContent.replace(
  /\[!\[Top Langs\].*?\]\(.*?\)/,
  `[![Top Langs](${langsUrl})](https://github.com/anuraghazra/github-readme-stats)`
);

// Check if content actually changed
if (oldContent === readmeContent) {
  console.log('No changes detected in README content');
} else {
  console.log('Changes detected in README content');
}

// Write the updated content back to README
fs.writeFileSync(readmePath, readmeContent);
console.log('Successfully wrote updated README.md'); 