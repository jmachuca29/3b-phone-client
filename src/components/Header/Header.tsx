import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useAppStore from "src/store/store";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [setFn, user] = useAppStore((state) => [state.setFn, state.user]);
  const handleLogin = () => {
    if (Object.keys(user).length === 0) {
      navigate("/login");
    } else {
      setFn.removeUser();
      localStorage.removeItem("3b-iphone-token");
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={() => handleLogin()}>
            { Object.keys(user).length === 0 ? "Login" : "Logout" }
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
