import fs from "node:fs";
import path from "node:path";

import { simpleGit } from "simple-git";

const repoPath = "../generated-repo";
const fileName = "report.json";

const git = simpleGit({ baseDir: repoPath });

type Author = {
  authorName: string;
  authorEmail: string;
};

type Metric = {
  name: string;
  increase: number;
  value: number;
};

type Info = {
  commitDate: string;
  author: Author;
  metrics: Record<string, Metric>;
};

const getUniqAuthors = (info: Info[]) => {
  const authors: Record<string, Author> = {};
  for (const i of info) {
    authors[i.author.authorEmail] = i.author;
  }
  return Object.values(authors);
};

type Metrics = Record<string, number>;

const generateMetrics = (currentMetrics: Metrics, previousMetric: Metrics) => {
  const metricsResult: Record<string, Metric> = {};
  for (const metric in currentMetrics) {
    metricsResult[metric] = {
      name: metric,
      value: currentMetrics[metric],
      increase: currentMetrics[metric] - previousMetric[metric],
    };
  }
  return metricsResult;
};

(async () => {
  const gitLog = await git.log();
  const info: Info[] = [];
  let previous = {};
  const reversedCommits = [...gitLog.all].reverse();
  for (const commit of reversedCommits) {
    await git.checkout(commit.hash);
    if (fs.existsSync(path.join(repoPath, fileName))) {
      const currentFile = fs.readFileSync(
        path.join(repoPath, fileName),
        "utf-8",
      );
      const currentJson = JSON.parse(currentFile);
      info.push({
        commitDate: new Date(commit.date).toISOString().split("T")[0],
        author: {
          authorName: commit.author_name,
          authorEmail: commit.author_email,
        },
        metrics: generateMetrics(currentJson, previous),
      });
      previous = currentJson;
    } else {
      break;
    }
  }
  const authors = getUniqAuthors(info);
  const result = {
    metadata: info,
    authors,
  };
  if (gitLog.latest) {
    await git.checkout(gitLog.latest.hash);
  }
  fs.writeFileSync("result.json", JSON.stringify(result, null, 2));
})();
