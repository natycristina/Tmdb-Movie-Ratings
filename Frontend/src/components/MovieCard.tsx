type MovieCardProps = {
  title: string;
  poster_path: string;
  onClick: () => void;
};

export function MovieCard({
  title,
  poster_path,
  onClick,
}: MovieCardProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={imageUrl} alt={title} width={200} />
      <h3>{title}</h3>
    </div>
  );
}