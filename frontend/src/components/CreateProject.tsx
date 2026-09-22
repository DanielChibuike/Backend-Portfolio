
import { useState } from "react";
import "./CreateProject.css";

function CreateProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    problemSolved: "",
    features: "",
    challenges: "",
    whatILearned: "",
    liveDemoUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Creating project...");

    const token = localStorage.getItem("token");

    const project = {
      ...form,
      technologies: form.technologies.split(",").map((item) => item.trim()),
      features: form.features.split(",").map((item) => item.trim()),
      challenges: form.challenges.split(",").map((item) => item.trim()),
      whatILearned: form.whatILearned
        .split(",")
        .map((item) => item.trim()),
    };

    try {
      const response = await fetch(
        "http://localhost:3700/api/projects/createproject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(project),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create project.");
        return;
      }

      setMessage("Project created successfully.");

      setForm({
        title: "",
        description: "",
        image: "",
        technologies: "",
        problemSolved: "",
        features: "",
        challenges: "",
        whatILearned: "",
        liveDemoUrl: "",
      });
    } catch {
      setMessage("Unable to connect to the server.");
    }
  };

  return (
    <section className="create-project">
      <p>ADMIN</p>
      <h2>Create Project</h2>

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
          placeholder="Image URL"
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

        <button type="submit">Create Project</button>

        {message && <p>{message}</p>}
      </form>
    </section>
  );
}

export default CreateProject;
