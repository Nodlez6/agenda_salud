import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { useContext } from "react";
import { types } from "../../types/types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  let pages = [];
  if (user.admin) {
    pages = ["Citas", "Horario", "Pacientes", "Estadísticas", "Archivos"];
  } else {
    pages = ["Inicio","citas", "archivos"];
  }
  const settings = ["Perfil", "Cerrar sesión"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    const opcion = e.target.textContent;
    switch (opcion) {
      case "Horario":
        navigate("/schedule");
        break;
      case "Pacientes":
        navigate("/patients");
        break;
      case "Estadísticas":
        navigate("/statistics");
        break;
      default:
        break;
    }
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    const opcion = e.target.textContent;

    switch (opcion) {
      case "Perfil":
        navigate("/profile");
        break;
      case "Cerrar sesión":
        const action = {
          type: types.logout,
        };
        dispatch(action);
        localStorage.removeItem("user");
        navigate("/login");
        break;
      default:
        break;
    }
  };

  return (
    <AppBar sx={{ backgroundColor: "#163172" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalHospitalIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,

              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 600,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            AGENDA SALUD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <LocalHospitalIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AGENDA SALUD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Ver opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "red" }}>{user.nombre[0]}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
          
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
