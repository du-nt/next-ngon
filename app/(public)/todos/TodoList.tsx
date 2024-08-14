"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Skeleton, Typography } from "@mui/material";

export default function TodoList() {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
  });

  if (isLoading)
    return (
      <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>

        <Skeleton width={200}>
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    );

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data?.data.map((item: any) => (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );
}
