import fs from "node:fs";
import path from "node:path";

import { simpleGit } from "simple-git";

const repoPath = "../generated-repo";
const fileName = "report.json";

const git = simpleGit({ baseDir: repoPath });

export type Author = {
  authorName: string;
  authorEmail: string;
};

type Metric = {
  name: string;
  value: number;
};

export type Info = {
  commitDate: string;
  author: Author;
  metrics: Record<string, Metric>;
};

export type MetricReport = {
  metadata: Info[];
  authors: Author[];
  metrics: string[];
};

export const getUniqAuthors = (info: Info[]) => {
  const authors: Record<string, Author> = {};
  for (const i of info) {
    authors[i.author.authorEmail] = i.author;
  }
  return Object.values(authors);
};

export const getUniqMetrics = (info: Info[]) => {
  const metrics = new Set(info.flatMap((info) => Object.keys(info.metrics)));
  return Array.from(metrics);
};

type Metrics = Record<string, number>;

export const generateMetrics = (currentMetrics: Metrics) => {
  const metricsResult: Record<string, Metric> = {};
  for (const metric in currentMetrics) {
    metricsResult[metric] = {
      name: metric,
      value: currentMetrics[metric],
    };
  }
  return metricsResult;
};

(async () => {
  const gitLog = await git.log();
  const info: Info[] = [];
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
        metrics: generateMetrics(currentJson),
      });
    } else {
      break;
    }
  }
  const authors = getUniqAuthors(info);
  const metrics = getUniqMetrics(info);
  const result: MetricReport = {
    metadata: info,
    authors,
    metrics,
  };
  if (gitLog.latest) {
    await git.checkout(gitLog.latest.hash);
  }
  fs.writeFileSync("result.json", JSON.stringify(result, null, 2));
})();
