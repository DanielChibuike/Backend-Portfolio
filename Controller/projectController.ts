const Project = require("../Model/projectModel");
import type { Request, Response } from "express";


const createProject = async (req:Request,res:Response) =>{

    try{
        const {title, description, image, technologies, problemSolved, features, challenges, whatILearned, liveDemoUrl} = req.body;
        //check if all fields are provided
        if(!title || !description || !image || !technologies || !problemSolved || !features || !challenges || !whatILearned || !liveDemoUrl){
            return res.status(400).json({message: "All fields are required"});
        }
        const newProject = new Project({
            title,
            description,
            image,
            technologies,
            problemSolved,
            features,
            challenges,
            whatILearned,
            liveDemoUrl
        });
         await newProject.save();
        res.status(201).json({message: "Project created successfully", newProject});
    }  catch (error: unknown) {
    console.error("Error creating project:", error);

    if (
        typeof error === "object" &&
        error !== null &&
        "name" in error
    ) {
        if (
            error.name === "ValidationError" ||
            error.name === "CastError"
        ) {
            return res.status(400).json({
                message: "Invalid project data"
            });
        }
    }

    return res.status(500).json({
        message: "Internal server error"
    });
}
}

/* Get all projects from the database*/
    const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Projects fetched successfully",
            projects
        });

    } catch (error: unknown) {
        console.error("Error fetching projects:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/* Get a single project by ID from the database */
const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        return res.status(200).json({
            message: "Project fetched successfully",
            project
        });
    } catch (error: unknown) {
        console.error("Error fetching project:", error);

        if (
            typeof error === "object" &&
            error !== null &&
            "name" in error &&
            error.name === "CastError"
        ) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/* Update a project by ID in the database */

const updateProjectById = async (req:Request, res:Response) => {

    try {
        const {id} = req.params;
    
        const {title, description,image,technologies,problemSolved,features,challanges,whatIlearned,liveDemoUrl} = req.body;
        const updateproject = await Project.findByIdAndUpdate(id,
            {title, description,image,technologies,problemSolved,features,challanges,whatIlearned,liveDemoUrl},

            {new: true, runValidators: true}
        );
        if(!updateproject){
            return res.status(404).json({message:"project not found"});

        }
        return res.status(200).json({message:"Project Succesfully Updated",updateproject});
    
    }catch(error:unknown){
        console.error("Error Updating Project",error)

        if(typeof error ==="object" &&
            error !== null &&
            "name" in error &&
            error.name === "CastError"
        ){
            return res.status(400).json({message:"Invalid Project Id"});

        }
        return res.status(500).json({message:"Internal Server Error"});
    }
};

/* find project by id and delete*/

const deleteProjectById = async (req:Request, res: Response) =>{

    try{
        const {id} = req.params;
        const deleteproject = await Project.findByIdAndDelete(id);

        if(!deleteproject){
            return res.status(404).json({message:"project not found"});
        }
        return res.status(200).json({message:"Succesfully deleted a project"});
    }catch(error:unknown){
        console.error("Error deleting project:",error);
    
    if(typeof error === "object" &&
        error !== null &&
        "name" in error &&
        error.name === "CastError"
    ){
        return res.status(400).json({message:"Invaid project ID"})

    }
    return res.status(500).json({message:"internal server error"})
}
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById
};