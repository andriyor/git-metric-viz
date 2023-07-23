"use client";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import json from "../result.json";
import { Chart } from "@/app/Chart";
import { Authors } from "@/app/Authors";

export default function Home() {
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [metadata, setMetadata] = useState(json.metadata);

  useEffect(() => {
    if (selectedAuthor) {
      const filtered = json.metadata.filter(
        (m) => m.author.authorEmail === selectedAuthor.authorEmail,
      );
      setMetadata(filtered);
    }
  }, [selectedAuthor]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <div style={{ height: "600px" }}>
            <Chart metadata={metadata} />
          </div>
        </Grid>
        <Grid item xs={2}>
          <Authors onAuthorClick={setSelectedAuthor} />
        </Grid>
      </Grid>
    </div>
  );
}
