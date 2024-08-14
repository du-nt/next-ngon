import { Box, Typography } from "@mui/material";
import React from "react";
import TodoList from "./TodoList";

export default function Todos() {
  return (
    <Box>
      <Typography>Todos</Typography>
      <TodoList />
    </Box>
  );
}
