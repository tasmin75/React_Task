import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Popover from "@mui/material/Popover";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./Sidebar.css";
import { LocalSee } from "@mui/icons-material";

const drawerWidth = 240;

const menu = [
  {
    path: "/",
    name: "Company setup",
  },
  {
    path: "/customer",
    name: "Customer",
  },
  {
    path: "/items",
    name: "Items",
  },
  {
    path: "/other-setup",
    name: "Other Setup",
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "black",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const [userData, setUserData] = useState([]);
  const myData = localStorage.getItem("userData");
  const myDataParse = JSON.parse(myData);
  console.log("myDataParse", myDataParse);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? "simple-popover" : undefined;
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    const { username, password } = inputValue;
    if (username && password) {
      if (username === "Tasmin" && password === "Tasmin123") {
        alert("Login Successful");
      } else {
        alert("Login Failed");
      }
      setUserData([...userData, inputValue]);
      localStorage.setItem("userData", JSON.stringify(inputValue));
    }
    handleCloseModal();
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <div className="sidebar">
          <AppBar position="fixed" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <div className="sidebar__logo">
                {myDataParse?.username ? (
                  <Typography style={{color:"red"}}>
                    {myDataParse?.username}
                  </Typography>
                ) : (
                  <Typography style={{color:"red"}}>
                    please login
                  </Typography>
                )}
                <img
                  src="https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png"
                  alt=""
                  onClick={handleClick}
                />
                <Popover
                  id={popoverId}
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  {myDataParse?.username ? (
                    <Typography sx={{ p: 2 }} onClick={logout}>
                      Logout
                    </Typography>
                  ) : (
                    <Typography sx={{ p: 2 }} onClick={handleOpenModal}>
                      Login
                    </Typography>
                  )}
                </Popover>
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menu.map((item, index) => (
              <ListItem
                key={item.name}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  activeClassName="active-link"
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor:
                      location.pathname === item.path ? "#ff9800" : "white",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Login Form</Typography>

          <form onSubmit={handleSubmitData} className="form">
          <span>userId:Tasmin</span>
          <span>password:Tasmin123</span>
            <TextField
              label="Username"
              value={inputValue.username}
              name="username"
              variant="outlined"
              onChange={handleChangeData}
              fullWidth
            />
            <TextField
              label="Password"
              value={inputValue.password}
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={handleChangeData}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Sidebar;
