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
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const getColumnStyles = (columnName : string) => {
    switch (columnName) {
      case 'A faire':
        return {
          columnStyle: {  border: "2px solid #DEE3E0", },
          columnTitle:{backgroundColor: "#e02b81",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"},
          cardStyle: { backgroundColor: '#f2e1ea' },
          cardButton: { backgroundColor: '#e02b81' },
          progress: classes.aFaire,

      };
      case 'En cours':
        return {
          columnStyle: {  border: "2px solid #DEE3E0", },
          columnTitle:{backgroundColor: "#36c5f1",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"},
          cardStyle: { backgroundColor: '#cee3e9' },
          cardButton: { backgroundColor: '#36c5f1' },
          progress: classes.enCours,
      };
      
      case 'Code revue':
        return {
          columnStyle: {   border: "2px solid #DEE3E0" },
          columnTitle:{backgroundColor: "#360845",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"},
          cardStyle: { backgroundColor: '#d1bfd7' },
          cardButton: { backgroundColor: '#360845' },
          progress: classes.codeRevue,
      };
      
      case 'Terminé':
        return {
          columnStyle: {   border: "2px solid #DEE3E0" },
          columnTitle:{backgroundColor: "#f0c536",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"},
          cardStyle: { backgroundColor: '#f3e5b6' },
          cardButton: { backgroundColor: '#f0c536' },
          progress: classes.termine,
      };
      
      default:
        return {
          columnStyle: {   border: "2px solid #DEE3E0" },
          columnTitle:{backgroundColor: "rgb(0,128,64)",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"},
          cardStyle: { backgroundColor: 'rgb(121,255,188)' },
          cardButton: { backgroundColor: 'rgb(0,128,64)' },
        };
    }
  };

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
          {column?.map((col: TColumn | any) => {
            const { columnStyle, columnTitle,cardStyle,cardButton,progress } = getColumnStyles(col?.name);
            return(
            
              <div >
                <div className={classes.column} style={{ ...columnStyle}}>
                  <div className={classes.colName} style={{ ...columnTitle}}>{col.name}</div>
                  {/* Afficher les cartes dans la colonne actuelle */}
                  {col?.cards?.map((card: any) => (
                    <Card
                      className={classes.carte}
                      onClick={() =>
                        updateCardInformation(col?._id, card.title, card)
                      }
                      style={{ cursor: "pointer", ...cardStyle }}
                    >
                      <CardContent>
                        <Typography className={classes.valueCard}>
                          Titre : {card.title}
                        </Typography>
  
                        {/* <LinearProgress
                        variant="determinate"
                        value={card.progress}
                        style={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: 'transparent',
                        }}
                      >
                        <style jsx>{`
                          .MuiLinearProgress-bar {
                            background-color: ${card.progress < 50
                              ? 'red'
                              : card.progress < 70
                              ? 'yellow'
                              : 'green'};
                          }
                        `}</style>
                      </LinearProgress> */}
                        
                        <Typography className={classes.valueCardContent}>Description : {card.description}</Typography>
                        <Typography className={classes.valueCardContent}>Assigné à : {card.assignee}</Typography>
                        <Typography className={classes.valueCardContent}>Date limite : {card.dueDate}</Typography>
                        <LinearProgress
                          className={`${classes.valueProgress} ${progress}`}
                          variant="determinate"
                          value={card.progress}
    
                        />
                      </CardContent>
                    </Card>
                  ))}
  
                  <Button
                    variant="text"
                    className={classes.plus}
                    style={{ ...cardButton}}
                    onClick={() => addCard(col?._id)}
                  >
                    + {t('addCard')}
                  </Button>
                </div>
              </div>
            )
          })}
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
