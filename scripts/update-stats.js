const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Security: Don't log the token or any sensitive information
console.log('Starting secure stats update script...');

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

async function getPrivateRepoStats() {
  let page = 1;
  let repos = [];
  while (true) {
    const res = await fetch(`https://api.github.com/user/repos?type=private&per_page=100&page=${page}`,
      { headers: { Authorization: `token ${token}` } });
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    repos = repos.concat(data);
    page++;
  }
  const totalPrivateRepos = repos.length;
  const totalPrivateStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  // Optionally, fetch commit counts for each repo (requires more API calls)
  let totalCommits = 0;
  for (const repo of repos) {
    const commitsRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`,
      { headers: { Authorization: `token ${token}` } });
    const commits = commitsRes.headers.get('link');
    if (commits && commits.includes('last')) {
      // Parse the last page number from the link header
      const match = commits.match(/&page=(\d+)>; rel="last"/);
      if (match) totalCommits += parseInt(match[1], 10);
      else totalCommits += 1;
    } else {
      // Only one page or less
      const data = await commitsRes.json();
      totalCommits += Array.isArray(data) ? data.length : 0;
    }
  }
  return { totalPrivateRepos, totalPrivateStars, totalCommits };
}

(async () => {
  const { totalPrivateRepos, totalPrivateStars, totalCommits } = await getPrivateRepoStats();
  // Replace the stats section in README
  readmeContent = readmeContent.replace(
    /(<!-- GITHUB_STATS_START -->)[\s\S]*?(<!-- GITHUB_STATS_END -->)/,
    `<!-- GITHUB_STATS_START -->\n**Total Private Repositories:** ${totalPrivateRepos}\n\n**Total Private Stars:** ${totalPrivateStars}\n\n**Total Commits (Private + Public):** ${totalCommits}\n<!-- GITHUB_STATS_END -->`
  );
  fs.writeFileSync(readmePath, readmeContent);
  console.log('Successfully wrote updated README.md');
})(); 