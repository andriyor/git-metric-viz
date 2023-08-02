import fs from "node:fs";
import util from "node:util";
const exec = util.promisify(require("node:child_process").exec);

import { jsonrepair } from "jsonrepair";

import {
  generateMetrics,
  getUniqAuthors,
  getUniqMetrics,
  Info,
  MetricReport,
} from "@/generate-report-based-on-file";

(async () => {
  process.chdir("../generated-repo");
  const res = await exec('git log --pretty=format:"%an:::%ce:::%aD:::%N"');
  const info: Info[] = [];
  for (const line of res.stdout.split("\n\n").reverse()) {
    const [authorName, authorEmail, commitDate, metric] = line
      .replace("\n", "")
      .split(":::");
    const repairedMetric = jsonrepair(metric);
    const currentJson = JSON.parse(repairedMetric);
    info.push({
      commitDate: new Date(commitDate).toISOString().split("T")[0],
      author: {
        authorName,
        authorEmail,
      },
      metrics: generateMetrics(currentJson),
    });
  }
  const authors = getUniqAuthors(info);
  const metrics = getUniqMetrics(info);
  const result: MetricReport = {
    metadata: info,
    authors,
    metrics,
  };
  process.chdir("../git-metric");
  fs.writeFileSync("result-notes.json", JSON.stringify(result, null, 2));
})();
