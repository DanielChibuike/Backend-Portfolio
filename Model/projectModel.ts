const mongoose = require("mongoose");

interface IProject {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    problemSolved: string;
    features: string[];
    challenges: string[];
    whatILearned: string[];
    liveDemoUrl: string;
}
const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
         type: String,
         required: true,
         trim: true
    },

    image: {
        type: String,
        required: true,
        trim: true
    },

    technologies: {
        type: [String],
        required: true,
        trim: true
    },
    problemSolved: {
        type: String,
        required: true,
        trim: true
    },
    features: {
        type: [String],
        required: true,
        trim: true
    },
    challenges: {
        type: [String],
        required: true,
        trim: true
    },
    whatILearned: {
        type: [String],
        required: true,
        trim: true
    },
    liveDemoUrl: {
        type: String,
        required: true,
        trim: true
    },
    
},
{timestamps: true}//time created and updated
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

export {};