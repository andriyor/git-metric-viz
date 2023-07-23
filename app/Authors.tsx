import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

import json from "@/result.json";

export const Authors = ({ onAuthorClick }: any) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {json.authors.map((author: any) => (
            <ListItem
              disablePadding
              key={author.authorEmail}
              onClick={() => onAuthorClick(author)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText
                  primary={author.authorName}
                  secondary={author.authorEmail}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};
