// src/components/ImageGallery/ImageGallery.tsx
import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (url: string) => void;
  firstNewImageRef: React.RefObject<HTMLLIElement>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
  firstNewImageRef,
}) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, urls, alt_description }, index) => (
        <li
          key={id}
          className={css.galleryItem}
          ref={index === images.length - 12 ? firstNewImageRef : null}
        >
          <ImageCard
            webformatURL={urls.small}
            tags={alt_description || ""}
            onClick={() => onImageClick(urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
