import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import ThemeSwitch from "@/components/atoms/ThemeSwitch";
import LanguageSwitcher from "@/components/molecules/LanguageSwitcher";
import dynamic from "next/dynamic";
const AAA = dynamic(() => import("../molecules/AAA"), {
  ssr: false,
  loading: () => <Button color="inherit">Loading</Button>,
});

export default function Header() {
  return (
    <Toolbar className="!px-3 tablet:!px-6">
      <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>

      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        MUI
      </Typography>

      <Box className="flex items-center">
        <LanguageSwitcher />

        <FormControlLabel
          className="select-none"
          control={<ThemeSwitch checked={true} />}
          label="Mode"
        />

        <AAA />
      </Box>
    </Toolbar>
  );
}
