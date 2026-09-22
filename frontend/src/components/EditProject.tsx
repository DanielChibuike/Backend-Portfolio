import { useState } from "react";
import type { Project } from "../types/project";
import "./EditProject.css";

type Props = {
  project: Project;
  onUpdated: (project: Project) => void;
  onCancel: () => void;
};

function EditProject({ project, onUpdated, onCancel }: Props) {
  const [form, setForm] = useState({
    title: project.title,
    description: project.description,
    image: project.image,
    technologies: project.technologies.join(", "),
    problemSolved: project.problemSolved,
    features: project.features.join(", "),
    challenges: project.challenges.join(", "),
    whatILearned: project.whatILearned.join(", "),
    liveDemoUrl: project.liveDemoUrl,
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const updatedProject = {
      ...form,
      technologies: form.technologies.split(",").map((item) => item.trim()),
      features: form.features.split(",").map((item) => item.trim()),
      challenges: form.challenges.split(",").map((item) => item.trim()),
      whatILearned: form.whatILearned.split(",").map((item) => item.trim()),
    };

    try {
      const response = await fetch(
        `http://localhost:3700/api/projects/updateproject/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProject),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update project.");
        return;
      }

      setMessage("Project updated successfully.");
      onUpdated(data.updateProject);
    } catch {
      setMessage("Unable to connect to the server.");
    }
  };

  return (
    <section className="edit-project">
      <p>EDIT PROJECT</p>
      <h2>{project.title}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Project title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image path e.g. /complex.png"
          value={form.image}
          onChange={handleChange}
          required
        />

        <input
          name="technologies"
          placeholder="Technologies, separated by commas"
          value={form.technologies}
          onChange={handleChange}
          required
        />

        <textarea
          name="problemSolved"
          placeholder="Problem solved"
          value={form.problemSolved}
          onChange={handleChange}
          required
        />

        <textarea
          name="features"
          placeholder="Features, separated by commas"
          value={form.features}
          onChange={handleChange}
          required
        />

        <textarea
          name="challenges"
          placeholder="Challenges, separated by commas"
          value={form.challenges}
          onChange={handleChange}
          required
        />

        <textarea
          name="whatILearned"
          placeholder="What I learned, separated by commas"
          value={form.whatILearned}
          onChange={handleChange}
          required
        />

        <input
          name="liveDemoUrl"
          placeholder="Live demo URL"
          value={form.liveDemoUrl}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        {message && <p>{message}</p>}
      </form>
    </section>
  );
}

export default EditProject;