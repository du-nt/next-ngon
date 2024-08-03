import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type SpinnerProps = PropsWithChildren & {
  spinning?: boolean;
};

export default function Spinner({ children, spinning }: SpinnerProps) {
  if (children)
    return (
      <Box>
        {spinning && (
          <Box
            sx={{ backgroundColor: "background.paper" }}
            className="absolute top-0 bottom-0 left-0 right-0 opacity-50 z-10 flex justify-center items-center"
          >
            <CircularProgress />
          </Box>
        )}

        {children}
      </Box>
    );

  return (
    <Box>
      <CircularProgress />
    </Box>
  );
}
