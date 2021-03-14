import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Modal from "./Modal";
import GaleryService from "../services/galeryService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 650,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Galery() {
  const classes = useStyles();
  const [item, setItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [tileData, setTileData] = useState([]);
  const [isCreate, setCreate] = useState(true);
  const getGalery = async () => {
    try {
      let res = await GaleryService.getAll();
      setTileData(res.data.documents);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGalery();
  }, []);

  const handleClickOpen = (dato) => {
    if (!dato) {
      setItem({ title: "", img: "" });
      setCreate(true);
      setOpen(true);
    } else {
      setCreate(false);
      setItem(dato);
      setOpen(true);
    }
  };

  const handleClose = () => {
    getGalery();
    setOpen(false);
  };
  return (
    <div>
      {open && (
        <Modal
          open={open}
          handleClose={handleClose}
          item={item}
          isCreate={isCreate}
        ></Modal>
      )}
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile
            key="Subheader"
            cols={3}
            style={{ height: "auto", display: "flex" }}
          >
            <h2 component="div">Galery - crud</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleClickOpen(false);
              }}
            >
              Agregar
            </Button>
          </GridListTile>
          {tileData.map((tile, index) => (
            <GridListTile key={index}>
              <img src={tile.path} alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.name}`}
                    className={classes.icon}
                    onClick={() => {
                      handleClickOpen(tile);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}
