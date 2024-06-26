import mongoose, { Schema } from "mongoose";
import { TProject } from "../types/project";

const projectSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  startDate: {
    type: String,
    require: true,
  },
  endDate: {
    type: String,
    require: true,
  },
  column: [
    {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Column",
    },
  ],
});

export const Project = mongoose.model<TProject>("Project", projectSchema);
