import React, { useState, useEffect } from "react";
import { Button, LinearProgress, TextField } from "@material-ui/core";
import useStyles from "./styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import MyCard from "./MyCard";
import { TCard } from "../../../types/Card";
import { getAllCard, updateCard } from "../../../api/card-api";
import { TColumn } from "../../../types/Column";
import DialogColumn from "./DialogColumn";
import { getAllColumn } from "../../../api/column-api";
import ProjectStore from "../../../store/StoreProject";
import socket from "../../../utils/socket";
import Rating from "@mui/material/Rating";

const defaultColumn: TColumn = {
  name: "",
  card: [],
};
const defaultCard: TCard = {
  title: "",
  description: "",
  attachment: "",
  assignee: "",
  dueDate: "",
  progress: "",
};

const Corps = () => {
  const projectStore = ProjectStore();
  const classes = useStyles();
  const [card, setCard] = useState<TCard[] | []>([]);
  const [column, setColumn] = useState<TColumn[] | []>(
    projectStore.project.column
  );
  // console.log("11111111111111", projectStore.project);
  const [openCardDialog, setOpenCardDialog] = useState(false);
  const [openColumnDialog, setOpenColumnDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("");
  const [data, setData] = useState(defaultCard);
  const [dataColumn, setDataColumn] = useState(defaultColumn);
  const [idColumn, setIdColumn] = useState("");
  const [pourcentage, setPourcentage] = useState(0);

  const handlePourcentageChange = (event: any) => {
    const value = event.target.value;
    setPourcentage(value);
  };
  const getColumn = async () => {
    const result = await getAllColumn();
    setColumn(result);
    if (result) {
      setColumn(result.result);
    }
  };

  const getCard = async () => {
    const result = await getAllCard();
    setCard(result);
    if (result) {
      setCard(result.result);
    }
  };
  const handleSubmitComment = (comment: string) => {
    // Logique de soumission du commentaire, par exemple :
    console.log("Comment submitted:", comment);
    // Ici, vous pouvez appeler votre API pour soumettre le commentaire, etc.
  };
  // useEffect(() => {
  //   getColumn();
  // }, []);

  useEffect(() => {
    // console.log("22222222222", projectStore);
    if (projectStore.project) setColumn(projectStore.project.column);
    // console.log("useEffect ..............................................");
  }, [projectStore.project]);

  const addCard = (id: string) => {
    setIdColumn(id);
    setTitle("Créer une nouvelle carte");
    setMode("create");
    setData(defaultCard);
    setOpenCardDialog(!openCardDialog);
  };
  const updateCardInformation = (id: string, title: string, card: TCard) => {
    setIdColumn(id);
    setTitle(title);
    setMode("update");
    setData(card);
    setOpenCardDialog(!openCardDialog);
  };
  const handleCloseDialog = () => {
    setOpenColumnDialog(!openColumnDialog);
  };
  const handleCloseDialogCard = () => {
    setOpenCardDialog(!openCardDialog);
    if (openCardDialog) {
      setIdColumn("");
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.columnContainer}>
          {column?.map((col: TColumn | any) => (
            <div>
              <div className={classes.column}>
                <div className={classes.colName}>{col.name}</div>
                {/* Afficher les cartes dans la colonne actuelle */}
                {col?.cards?.map((card: any) => (
                  <Card
                    className={classes.carte}
                    onClick={() =>
                      updateCardInformation(col?._id, card.title, card)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <CardContent>
                      <Typography className={classes.valueCard}>
                        Titre : {card.title}
                      </Typography>

                      <Rating
                        name="customized-color"
                        defaultValue={card.progress / 20} // La valeur de la note est sur 5, donc diviser par 20
                        precision={0.5} // Pour autoriser les demi-étoiles
                        readOnly // Pour rendre la note non éditable
                        style={{
                          color:
                            card.progress < 50
                              ? "red"
                              : card.progress < 70
                              ? "yellow"
                              : "green",
                        }}
                      />
                      {/* <LinearProgress
                        className={classes.valueCard}
                        variant="determinate"
                        value={card.progress}
                        style={{
                          backgroundColor:
                            card.progress < 50
                              ? "red"
                              : card.progress < 70
                              ? "yellow"
                              : "green",
                        }}
                      /> */}
                      {/* <Typography>Description : {card.description}</Typography>
                      <Typography>Assigné à : {card.assignee}</Typography>
                      <Typography>Date limite : {card.dueDate}</Typography> */}
                    </CardContent>
                  </Card>
                ))}

                <Button
                  variant="text"
                  color="default"
                  className={classes.plus}
                  onClick={() => addCard(col?._id)}
                >
                  + Add card
                </Button>
              </div>
            </div>
          ))}
        </div>
        <DialogColumn
          column={column}
          open={openColumnDialog}
          handleClose={handleCloseDialog}
          data={dataColumn}
          projectName={projectStore.project.name}
        />
        <MyCard
          card={card}
          open={openCardDialog}
          handleClose={handleCloseDialogCard}
          title={title}
          mode={mode}
          data={data}
          trigger={getCard}
          idColumn={idColumn}
          placeholder="hi felana"
          onSubmitComment={handleSubmitComment}
        />
      </div>
    </div>
  );
};

export default Corps;