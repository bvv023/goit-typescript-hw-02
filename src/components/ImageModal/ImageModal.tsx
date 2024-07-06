// src/components/ImageModal/ImageModal.tsx
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

interface ImageModalProps {
  imageURL: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageURL, onClose }) => {
  const [imageOrientation, setImageOrientation] = useState<string>("landscape");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const img = new Image();
    img.src = imageURL;
    img.onload = () => {
      const orientation = img.width > img.height ? "landscape" : "portrait";
      setImageOrientation(orientation);
    };
  }, [imageURL]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  if (!imageURL) {
    return null;
  }

  return (
    <ReactModal
      isOpen={!!imageURL}
      onRequestClose={onClose}
      className={`${css.modal} ${
        imageOrientation === "portrait" ? css.portrait : css.landscape
      }`}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.modalContent} onClick={handleBackdropClick}>
        <img src={imageURL} alt="" className={css.modalImage} />
      </div>
    </ReactModal>
  );
};

export default ImageModal;
