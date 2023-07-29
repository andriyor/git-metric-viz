import fs from "node:fs";
import util from "node:util";
const exec = util.promisify(require("node:child_process").exec);

type Info = {
  day: number;
  metric: {
    testCoverage: number;
    LOC: number;
  };
  authorName: string;
  authorEmail: string;
};

(async () => {
  const info: Info[] = [
    {
      day: 9,
      metric: {
        testCoverage: 54,
        LOC: 185,
      },
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 8,
      metric: {
        testCoverage: 66,
        LOC: 230,
      },
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 7,
      metric: {
        testCoverage: 75,
        LOC: 270,
      },
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 6,
      metric: {
        testCoverage: 80,
        LOC: 300,
      },
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 5,
      metric: {
        testCoverage: 92,
        LOC: 340,
      },
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 4,
      metric: {
        testCoverage: 92,
        LOC: 380,
      },
      authorName: "main",
      authorEmail: "main@gmail.com",
    },
    {
      day: 3,
      metric: {
        testCoverage: 95,
        LOC: 410,
      },
      authorName: "Andrii Oriekhov",
      authorEmail: "andriyorehov@gmail.com",
    },
    {
      day: 2,
      metric: {
        testCoverage: 95,
        LOC: 460,
      },
      authorName: "main",
      authorEmail: "main@gmail.com",
    },
    {
      day: 1,
      metric: {
        testCoverage: 100,
        LOC: 500,
      },
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
    fs.writeFileSync("report.json", JSON.stringify(arrayElement.metric));
    await exec("git add .");
    await exec(`git config --global user.name "${arrayElement.authorName}"`);
    await exec(`git config user.email "${arrayElement.authorEmail}"`);
    await exec(
      `git commit --allow-empty --date="${arrayElement.day} day ago" -m "changes for day ${arrayElement.day}"`,
    );
  }
})();
