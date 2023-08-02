"use client";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { Chart } from "@/app/Chart";
import { Authors } from "@/app/Authors";
import { Metrics } from "@/app/Metric";
import { Container } from "@mui/material";
import { Drop } from "@/app/Drop";

import { Author, Info, MetricReport } from "@/generate-report-based-on-file";

import reportResult from "../result.json";

const addDiffToMetrics = (currentMetrics: Info[]) => {
  let previousValue = currentMetrics[0].metrics;
  for (const metricsResultElement of currentMetrics) {
    for (const metric in metricsResultElement.metrics) {
      // @ts-ignore
      metricsResultElement.metrics[metric]["diff"] =
        metricsResultElement.metrics[metric].value -
        previousValue[metric].value;
    }
    previousValue = metricsResultElement.metrics;
  }
  return currentMetrics;
};

export default function Home() {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>();
  const [selectedMetric, setSelectedMetric] = useState<string>("");
  const [metadata, setMetadata] = useState<Info[]>([]);
  const [report, setReport] = useState<MetricReport>();

  useEffect(() => {
    if (report?.metadata?.length) {
      if (selectedAuthor) {
        const filtered = report.metadata.filter(
          (m) => m.author.authorEmail === selectedAuthor.authorEmail,
        );
        setMetadata(addDiffToMetrics(filtered));
      } else {
        setMetadata(addDiffToMetrics(report.metadata));
      }
    }
  }, [selectedAuthor, report]);

  const onMetricDrop = (metric: MetricReport) => {
    setSelectedMetric(metric.metrics[0]);
    setReport(metric);
  };

  const loadExampleReport = () => {
    setSelectedMetric(reportResult.metrics[0]);
    setReport(reportResult);
  };

  return (
    <div className="mt-5">
      <Container maxWidth="xl">
        {report && metadata.length ? (
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <div style={{ height: "600px" }}>
                <Chart metadata={metadata} metricName={selectedMetric} />
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className="mb-3">
                <Authors
                  onAuthorClick={setSelectedAuthor}
                  authors={report.authors}
                />
              </div>
              <div>
                <Metrics
                  metrics={report.metrics}
                  onMetricClick={setSelectedMetric}
                  value={selectedMetric}
                />
              </div>
            </Grid>
          </Grid>
        ) : undefined}
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Drop onDropReport={onMetricDrop} />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={loadExampleReport}>
              Load example report
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
