import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useAppStore from "src/store/store";
import { useNavigate } from "react-router-dom";
import { MuiAppBar, MuiStack, MuiToolBar } from "./styles";
import { Avatar, Button, Link, Menu, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [setFn, user] = useAppStore((state) => [state.setFn, state.user]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    if (Object.keys(user).length === 0) {
      navigate("/login");
    } else {
      setFn.removeUser();
      localStorage.removeItem("3b-iphone-token");
    }
    handleClose();
  };

  useEffect(() => {
    Object.keys(user).length === 0 ? setIsLoggedIn(false) : setIsLoggedIn(true)
  }, [user])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar>
        <MuiToolBar>
          <MuiStack>
            <Stack sx={{
              flexDirection: "row",
              gap: 2,
              alignItems: "center"
            }}>
              <Box
                component="div"
                sx={{
                  width: '5rem',
                  height: '5rem',
                  display: 'inline-flex',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
              >
                <img src="src/assets/3b_iphone_logo.png" alt="3b_iphone_logo" />
              </Box>
              <Button LinkComponent={'a'} href="https://3biphones.com/preguntas-frecuentes/" target="_blank">
                FAQ
              </Button>
              <Button LinkComponent={'a'} href="https://3biphones.com/contacto/" target="_blank">
              Contacto
              </Button>
            </Stack>

            <IconButton aria-label="icon_avatar" onClick={handleClick}>
              <Avatar alt="avatar_25" src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {isLoggedIn
                ? [
                  <MenuItem key="profile" onClick={handleClose}>My Profile</MenuItem>,
                  <MenuItem key="sales" onClick={() => {
                    navigate('/my-sales')
                    handleClose()
                  }}>My Sales</MenuItem>,
                  <MenuItem key="logout" onClick={handleLogin}>Logout</MenuItem>
                ]
                : <MenuItem onClick={handleLogin}>Login</MenuItem>
              }
            </Menu>
          </MuiStack>
        </MuiToolBar>
      </MuiAppBar>
    </Box>
  );
};
