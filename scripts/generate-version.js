const fs = require('fs');
const { execSync } = require('child_process');

// get current commit sha
const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

// get current timestamp
const buildTime = new Date().toISOString();

// create version.json
const versionData = {
  commitHash,
  buildTime,
};

fs.writeFileSync('public/version.json', JSON.stringify(versionData, null, 2));
console.log('Create version.json successfully!:', versionData);
