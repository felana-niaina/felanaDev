import React, { FC, useEffect, useState } from "react";
import ProjectStore from "../../store/StoreProject";
import { TProject } from "../../types/Project";
import { TColumn } from "../../types/Column";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import { createProject, getListProject } from "../../api/project-api";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ProductOwner = () => {
  const projectStore = ProjectStore();
  const [listProject, setListProject] = useState<TProject[] | []>([]);
  const [openNewProject, setOpenNewProject] = useState(false);
  const [newProjectModal, setNewProjectModal] = useState<TProject>({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    column: [],
  });
  const history = useNavigate();
  const newProject = () => {
    setOpenNewProject(!openNewProject);
  };
  const handleCloseProject = () => {
    setOpenNewProject(!openNewProject);
    if (openNewProject) {
      setNewProjectModal({
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        column: [],
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewProjectModal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDetailsClick = async (projectId: any) => {
    history(`/backlog/${projectId}`); // Navigation vers la page de détails du backlog avec l'ID du projet
    await localStorage.setItem("Project_id", projectId);
  };
  const handleValidate = async () => {
    await createProject(newProjectModal);
    await getListProject();
    setOpenNewProject(!openNewProject);
  };

  useEffect(() => {
    setListProject(projectStore.listProject);
  }, [projectStore.listProject]);
  return (
    <div>
      <TableContainer component={Paper} className="m-4 p-5 me-10">
        <table className="table-fixed border-collapse border border-slate-400">
          <caption className="caption-top text-center">
           Liste des projets existants
          </caption>
          <thead>
            <tr  className="text-center">
              <th className="border border-slate-300 px-2 py-2">Nom du projet</th>
              <th className="border border-slate-300 px-2 py-2">Description</th>
              <th className="border border-slate-300 px-2 py-2">Date de début</th>
              <th className="border border-slate-300 px-2 py-2">Date fin</th>
              {/* <th className="border border-slate-300 px-2 py-2">Progress</th> */}
              <th className="border border-slate-300 px-2 py-2">Product backlog</th>
            </tr>
          </thead>
          <tbody>
            {projectStore.listProject?.map((project: TProject | any) => (
              <tr  className="text-center">
                <td className="border border-slate-300 px-[6px] py-1">{project.name}</td>
                <td className="border border-slate-300 px-[6px] py-1">
                  {project.description}
                </td>
                <td className="border border-slate-300 px-[6px] py-1">{project.startDate}</td>
                <td className="border border-slate-300 px-[6px] py-1">{project.endDate}</td>
                {/* <td className="border border-slate-300 px-[6px] py-1">0</td> */}
                <td className="border border-slate-300 px-[6px] py-1">
                  <div className="flex justify-center">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#FDAF1B",
                        color: "#fff",
                        fontSize: "0.75rem",
                      }}
                      onClick={() => handleDetailsClick(project._id)}
                    >
                      Détails
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
      <div className="m-10">
        <Button
          onClick={newProject}
          variant="contained"
          style={{ backgroundColor: "#f50057", color: "#fff" }}
        >
          Ajouter un projet +
        </Button>
      </div>
      <Dialog open={openNewProject} onClose={handleCloseProject}>
        <DialogTitle>
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Créer un nouveau projet
            </h3>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Veuillez entrer le nom de votre nouveau projet dans le champ
            ci-dessous. Assurez-vous de choisir un nom unique et descriptif.
          </Typography>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nom du projet :
              </label>
              <input
                name="name"
                onChange={handleChange}
                value={newProjectModal.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Saisir le nom du projet"
              />
            </div>
            <div className="col-span-2">
              <Typography variant="body2" color="textSecondary">
                Exemple: "Refonte du site web", "Développement de l'application
                mobile", etc.
              </Typography>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="startDate">Date de début :</label>

              <input
                type="date"
                name="startDate"
                id="startDate"
                onChange={handleChange}
                value={newProjectModal.startDate}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Date début du projet"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="endDate">Date fin du projet :</label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                onChange={handleChange}
                value={newProjectModal.endDate}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Date fin du projet"
                required
              />
            </div>

            <div className="col-span-2">
              <textarea
                name="description"
                id="description"
                cols={60}
                rows={6}
                onChange={handleChange}
                value={newProjectModal.description}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ecrit la description du projet "
              ></textarea>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseProject}
          >
            Annuler
          </Button>
          <Button variant="contained" color="primary" onClick={handleValidate}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductOwner;
