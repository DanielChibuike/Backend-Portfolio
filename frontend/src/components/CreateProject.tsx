
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setMessage("Creating project...");

    const project = {
      ...form,
      technologies: form.technologies.split(",").map((item) => item.trim()).filter(Boolean),
      features: form.features.split(",").map((item) => item.trim()).filter(Boolean),
      challenges: form.challenges.split(",").map((item) => item.trim()).filter(Boolean),
      whatILearned: form.whatILearned.split(",").map((item) => item.trim()).filter(Boolean),
    };

    try {
      const response = await fetch(
        "https://backend-portfolio-i9c4.onrender.com/api/projects/createproject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(project),
        },
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
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="create-project">
      <div className="create-project-header">
        <p className="create-project-label">PORTFOLIO ADMIN</p>
        <h2>Create a project</h2>
        <p className="create-project-description">
          Add a project to your portfolio by providing its details below.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="project-field">
          <label htmlFor="project-title">Project title</label>
          <input
            id="project-title"
            name="title"
            placeholder="e.g. Digital Banking API"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="project-field">
          <label htmlFor="project-description">Description</label>
          <textarea
            id="project-description"
            name="description"
            placeholder="Briefly describe what the project does"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="project-field">
          <label htmlFor="project-image">Project image URL</label>
          <input
            id="project-image"
            name="image"
            type="url"
            placeholder="https://example.com/project-image.png"
            value={form.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="project-field">
          <label htmlFor="project-technologies">Technologies</label>
          <input
            id="project-technologies"
            name="technologies"
            placeholder="Node.js, NestJS, MongoDB"
            value={form.technologies}
            onChange={handleChange}
            required
          />
          <small>Separate each technology with a comma.</small>
        </div>

        <div className="project-field">
          <label htmlFor="project-problem">What it solves</label>
          <textarea
            id="project-problem"
            name="problemSolved"
            placeholder="Describe the problem this project solves"
            value={form.problemSolved}
            onChange={handleChange}
            required
          />
        </div>

        <div className="project-field">
          <label htmlFor="project-features">Key features</label>
          <textarea
            id="project-features"
            name="features"
            placeholder="User authentication, API integration, data management"
            value={form.features}
            onChange={handleChange}
            required
          />
          <small>Separate each feature with a comma.</small>
        </div>

        <div className="project-field">
          <label htmlFor="project-challenges">Challenges faced</label>
          <textarea
            id="project-challenges"
            name="challenges"
            placeholder="Describe the technical challenges you faced"
            value={form.challenges}
            onChange={handleChange}
            required
          />
          <small>Separate individual challenges with commas.</small>
        </div>

        <div className="project-field">
          <label htmlFor="project-learning">What I learned</label>
          <textarea
            id="project-learning"
            name="whatILearned"
            placeholder="Describe the skills and lessons gained"
            value={form.whatILearned}
            onChange={handleChange}
            required
          />
          <small>Separate individual lessons with commas.</small>
        </div>

        <div className="project-field">
          <label htmlFor="project-demo">Live demo URL</label>
          <input
            id="project-demo"
            name="liveDemoUrl"
            type="url"
            placeholder="https://your-project.com"
            value={form.liveDemoUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="create-project-submit">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating project..." : "Create Project"}
            {!isSubmitting && <span aria-hidden="true">→</span>}
          </button>

          {message && (
            <p className="project-form-message" role="status" aria-live="polite">
              {message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

export default CreateProject;