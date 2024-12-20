import { makeStyles } from "@material-ui/core/styles";
import fonds from "../../assets/qqq.jpg";
import fondsContainer from "../../assets/aaa.jpg";
const useStyles = makeStyles({
  container: {
    backgroundColor: "#fff",
    paddingTop: "100px",
    paddingBottom: "1.5rem",
    overflowY: "hidden",
    maxHeight:"100vh",
    display:"flex",
    justifyContent:"center"

  },
  contentContainer: {
    width: "35%",
    backgroundColor: "#fff",
    // background: "white",
    color: "#4682B4",
    boxShadow: "0px 2px 3px black",
    // borderRadius: "5px",
    paddingRight: "1rem",
  },
  textfield: {
    "& .MuiInputLabel-root": {
      fontSize: "0.75rem",
    },
    "& label": {
      color: "#000",
      fontSize: "0.75rem",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#f50057", // couleur de la ligne avant le focus
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "#f50057", // couleur de la ligne après le focus
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#f50057", // couleur du label après le focus
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#002f5d",
    },
  },
  uploadButton: {
    position: "relative",
    bottom: 0,
    right: 0,
    backgroundColor: "#f50057",
    padding: "7px",
    borderRadius: "50%",
    transition: "background-color 0.3s",
    width: "25px", // Ajoutez une largeur fixe pour le conteneur
    height: "25px", // Ajoutez une hauteur fixe pour le conteneur
    marginTop: "-40px",
    marginLeft: "6rem",
    "&:hover": {
      backgroundColor: "#2980b9",
    },
    "& input[type=file]": {
      fontSize: "30px",
      left: 0,
      top: 0,
      opacity: 0,
      width: "100%",
      height: "100%",
    },
    "&:after": {
      content: '"+"',
      color: "white",
      fontSize: "26px",
      position: "absolute", // Utilisez une position absolue
      top: "50%", // Placez le texte au milieu verticalement
      left: "50%", // Placez le texte au milieu horizontalement
      transform: "translate(-50%, -50%)",
    },
  },
});

export default useStyles;
