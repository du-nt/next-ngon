import { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { ListItemIcon, ListItemText, Menu } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";

import EnglandFlagIcon from "@/components/icons/EnglandFlagIcon";
import JapanFlagIcon from "@/components/icons/JapanFlagIcon";

export default function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lang: string) => () => {};

  return (
    <>
      <Button
        color="inherit"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="!mr-4"
        startIcon={<LanguageIcon />}
      >
        Language
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleChangeLanguage("en")}>
          <ListItemIcon>
            <EnglandFlagIcon className="border rounded-full" />
          </ListItemIcon>
          <ListItemText>English</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleChangeLanguage("ja")}>
          <ListItemIcon>
            <JapanFlagIcon className="border rounded-full" />
          </ListItemIcon>
          <ListItemText>Japanese</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
