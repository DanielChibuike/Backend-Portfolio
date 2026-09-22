type ProjectCardProps = {
  title: string;
  description: string;
};

function ProjectCard({ title, description }: ProjectCardProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default ProjectCard;