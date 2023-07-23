import fs from "node:fs";
import util from "node:util";
const exec = util.promisify(require("node:child_process").exec);

(async () => {
  const info = [
    {
      day: 9,
      testCoverage: 54,
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 8,
      testCoverage: 66,
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 7,
      testCoverage: 75,
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 6,
      testCoverage: 80,
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 5,
      testCoverage: 92,
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 4,
      testCoverage: 92,
      authorName: "main",
      authorEmail: "main@gmail.com",
    },
    {
      day: 3,
      testCoverage: 95,
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 2,

      testCoverage: 95,
      authorName: "main",
      authorEmail: "main@gmail.com",
    },
    {
      day: 1,
      testCoverage: 100,
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
  ];

  process.chdir("..");

  const repoName = "generated-repo";

  await exec(`mkdir ${repoName}`);

  process.chdir(repoName);

  await exec("git init");

  for (const arrayElement of info) {
    fs.writeFileSync(
      "report.json",
      JSON.stringify({
        testCoverage: arrayElement.testCoverage,
      }),
    );
    await exec("git add .");
    await exec(`git config --global user.name "${arrayElement.authorName}"`);
    await exec(`git config user.email "${arrayElement.authorEmail}"`);
    await exec(
      `git commit --allow-empty --date="${arrayElement.day} day ago" -m "changes for day ${arrayElement.day}"`,
    );
  }
})();
