import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const Metrics = ({
  metrics,
  onMetricClick,
  value,
}: {
  metrics: string[];
  onMetricClick: (metric: string) => void;
  value: string;
}) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Metric</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Metric"
          value={value}
          onChange={(event) => onMetricClick(event.target.value)}
        >
          {metrics.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
