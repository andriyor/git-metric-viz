import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export const Authors = ({ authors, onAuthorClick }: any) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={authors}
        sx={{ width: 300 }}
        onChange={(event, value: any) => onAuthorClick(value)}
        getOptionLabel={(option) => option.authorName}
        renderInput={(params) => <TextField {...params} label="User" />}
        renderOption={(props: any, option) => (
          <Box component="li" {...props}>
            <div className="mr-2">
              <Avatar />
            </div>
            {option.authorName}
          </Box>
        )}
      />
    </Box>
  );
};
