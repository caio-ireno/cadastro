import { Facebook, Instagram } from "@mui/icons-material";
import {
  Grid,
  Icon,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ListItemLinkProps {
  label: string;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, label }) => {
  const theme = useTheme();
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };
  return (
    <ListItemButton
      sx={{
        ":hover": {
          backgroundColor: "#fff",
          textDecorationLine: "underline",
          textDecorationColor: "#5DADE2",
          textDecorationThickness: "5px ",
          textDecorationSkipInk: "none",
        },
      }}
      onClick={handleClick}
    >
      <Typography fontSize={mdDown ? 12 : 15} fontWeight={"bold"}>
        {label}
      </Typography>
    </ListItemButton>
  );
};

export const Footer: React.FC = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      mx={mdDown ? 2 : 5}
      my={2}
      p={3}
    >
      {!smDown && (
        <Box display="flex" alignItems={"center"} justifyContent="center">
          <Box
            sx={{
              height: mdDown ? theme.spacing(6) : theme.spacing(14),
              width: mdDown ? theme.spacing(10) : theme.spacing(20),
            }}
            component="img"
            src="https://static.goomer.app/stores/63568/products/mobile_menu/templates/91794/logo_v1600432939.png"
          />
        </Box>
      )}

      {!smDown && (
        <Grid
          flexDirection={mdDown ? "column" : "row"}
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          width={"300px"}
          container
        >
          <Grid
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
            item
            xs={6}
          >
            <ListItemLink to="/pagna-inicial" label="Pagina inicial" />
            <ListItemLink to="/sorvetes" label="Sorvetes" />
          </Grid>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            item
            xs={6}
          >
            <ListItemLink to="/lojas" label="Lojas" />
            <ListItemLink to="/historia" label="Historia" />
          </Grid>
        </Grid>
      )}

      <Box display="flex" flexDirection="column">
        <Typography
          color="#3498DB"
          fontWeight={"bold"}
          fontSize={mdDown ? 20 : 30}
        >
          Fale conosco
        </Typography>
        <Typography
          fontSize={mdDown ? 15 : 20}
          marginLeft={mdDown ? "0px" : "25px"}
          color="#717D7E"
        >
          Se quiser bater um papo, ligue
        </Typography>
        <Box gap={2} display="flex" alignItems={"center"} mt={2}>
          {!mdDown && <Icon>phone</Icon>}
          <Typography fontSize={mdDown ? 15 : 20}>(15) 996641733</Typography>
        </Box>
        <Box gap={2} display="flex" alignItems={"center"} mt={1}>
          {!mdDown && <Icon>mail</Icon>}
          <Typography fontSize={mdDown ? 15 : 20}>urla@gmail.com</Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column">
        <Typography
          color="#3498DB"
          fontWeight={"bold"}
          fontSize={mdDown ? 20 : 30}
        >
          {mdDown && "Nossas redes sociais"}
          {!mdDown && "Siga nossas redes sociais"}
        </Typography>
        <Box gap={2} display="flex" alignItems={"center"} mt={2}>
          {!mdDown && (
            <Icon>
              <Facebook />
            </Icon>
          )}
          <Typography fontSize={mdDown ? 15 : 20}>(15) 996641733</Typography>
        </Box>
        <Box gap={2} display="flex" alignItems={"center"} mt={1}>
          {!mdDown && (
            <Icon>
              <Instagram></Instagram>
            </Icon>
          )}
          <Typography fontSize={mdDown ? 15 : 20}>urla@gmail.com</Typography>
        </Box>
      </Box>
    </Box>
  );
};
