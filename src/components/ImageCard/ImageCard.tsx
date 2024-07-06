// src/components/ImageCard/ImageCard.tsx
import css from "./ImageCard.module.css";

interface ImageCardProps {
  webformatURL: string;
  tags: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ webformatURL, tags, onClick }) => {
  return (
    <div className={css.card} onClick={onClick}>
      <img src={webformatURL} alt={tags} className={css.image} />
    </div>
  );
};

export default ImageCard;
