import mongoose, { Schema } from "mongoose";
import { TSprint } from "../types/sprint";
const sprintSchema: Schema = new Schema({
  id: {
    type: String,
    require: true,
  },
  idProject: [
    {
      type: mongoose.Types.ObjectId,
      require: false,
      ref: "Project",
    },
  ],
  backlog: [
    {
      type: String,
      require: true,
    },
  ],
  priority: {
    type: String,
    require: true,
  },
  estimate: {
    type: String,
    require: true,
  },
  
});

export const Sprint = mongoose.model<TSprint>("Sprint", sprintSchema);

