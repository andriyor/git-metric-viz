import fs from "node:fs";
import util from "node:util";
const exec = util.promisify(require("node:child_process").exec);

type Info = {
  day: number;
  metric: {
    testCoverage: number;
    LOC: number;
  };
  author: {
    authorName: string;
    authorEmail: string;
  };
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const generateMaxArray = (min: number, max: number, steps: number) => {
  const diff = max - min;
  const increase = Number((diff / steps).toFixed(2));
  const result: number[] = [];
  let prev = min + increase;
  for (const number of [...Array(steps).keys()]) {
    result.push(prev);
    prev = Number((increase + prev).toFixed(2));
  }
  return result;
};

const randomElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];

const authors = [
  {
    authorName: "Andrii Oriekhov",
    authorEmail: "andriyorehov@gmail.com",
  },
  {
    authorName: "main",
    authorEmail: "main@gmail.com",
  },
];

(async () => {
  const info: Info[] = [];
  const daysInMonth = 30;
  const months = 3;
  const days = months * daysInMonth;
  const previousTestCoverage = generateMaxArray(20, 100, days).reverse();
  const previousLOC = generateMaxArray(185, 500, days).reverse();
  for (const day of [...Array(days).keys()].reverse()) {
    const prevIndex = day - 1 === -1 ? 0 : day - 1;
    info.push({
      day: day,
      metric: {
        testCoverage: getRandomInt(
          previousTestCoverage[prevIndex],
          previousTestCoverage[day],
        ),
        LOC: getRandomInt(previousLOC[prevIndex], previousLOC[day]),
      },
      author: randomElement(authors)
    });
  }

  process.chdir("..");

  const repoName = "generated-repo";

  await exec(`mkdir ${repoName}`);

  process.chdir(repoName);

  await exec("git init");

  for (const arrayElement of info) {
    const metric = JSON.stringify(arrayElement.metric)
    fs.writeFileSync("report.json", metric);
    await exec("git add .");
    await exec(
      `git config --global user.name "${arrayElement.author.authorName}"`,
    );
    await exec(`git config user.email "${arrayElement.author.authorEmail}"`);
    await exec(
      `git commit --allow-empty --date="${arrayElement.day} day ago" -m "changes for day ${arrayElement.day}"`,
    );
    await exec(
      `git notes add -m "${metric}"`,
    );
  }
})();
