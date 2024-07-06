import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import css from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ imageURL, onClose }) => {
  const [imageOrientation, setImageOrientation] = useState('landscape');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const img = new Image();
    img.src = imageURL;
    img.onload = () => {
      const orientation = img.width > img.height ? 'landscape' : 'portrait';
      setImageOrientation(orientation);
    };
  }, [imageURL]);

  const handleBackdropClick = (event) => {
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
      className={`${css.modal} ${imageOrientation === 'portrait' ? css.portrait : css.landscape}`}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.modalContent} onClick={handleBackdropClick}>
        <img src={imageURL} alt="" className={css.modalImage} />
      </div>
    </ReactModal>
  );
};

ImageModal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
