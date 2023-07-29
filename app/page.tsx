"use client";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import json from "../result.json";
import { Chart } from "@/app/Chart";
import { Authors } from "@/app/Authors";
import { Metrics } from "@/app/Metric";
import { Container } from "@mui/material";

const addDiffToMetrics = (currentMetrics: any) => {
  let previousValue = currentMetrics[0].metrics;
  for (const metricsResultElement of currentMetrics) {
    for (const metric in metricsResultElement.metrics) {
      metricsResultElement.metrics[metric]["diff"] =
        metricsResultElement.metrics[metric].value - previousValue[metric].value;
    }
    previousValue = metricsResultElement.metrics
  }
  return currentMetrics;
};

export default function Home() {
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [selectedMetric, setSelectedMetric] = useState(json.metrics[0]);
  const [metadata, setMetadata] = useState(json.metadata);

  useEffect(() => {
    if (selectedAuthor) {
      const filtered = json.metadata.filter(
        (m) => m.author.authorEmail === selectedAuthor.authorEmail,
      );
      setMetadata(addDiffToMetrics(filtered));
    } else {
      setMetadata(addDiffToMetrics(json.metadata));
    }
  }, [selectedAuthor]);

  return (
    <div className="mt-5">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <div style={{ height: "600px" }}>
              <Chart metadata={metadata} metricName={selectedMetric} />
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className="mb-3">
              <Authors onAuthorClick={setSelectedAuthor} />
            </div>
            <div>
              <Metrics onMetricClick={setSelectedMetric} value={selectedMetric} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
