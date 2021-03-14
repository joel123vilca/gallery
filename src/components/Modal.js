import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GaleryService from "../services/galeryService";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  img: {
    width: "200px",
    height: "200px",
  },
}));
export default function Modal(props) {
  const classes = useStyles();
  const { open, handleClose, item, isCreate } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [title, setTitle] = useState(item.name);
  const [image_url, setImage] = useState(item.path);
  const [img, setFile] = useState("");
  const onChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    setFile(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("document", img);
    data.append("name", title);
    try {
      if (isCreate) {
        await GaleryService.create(data);
      } else {
        await GaleryService.update(item.id, data);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {item && (
          <DialogTitle id="responsive-dialog-title">
            <TextField
              id="outlined-basic"
              label="Titulo"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </DialogTitle>
        )}
        <DialogContent>
          {item && (
            <img src={image_url} alt={item.name} className={classes.img} />
          )}
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={onChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} variant="contained" color="primary">
            Guardar
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
