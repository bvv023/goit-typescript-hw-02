import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, onImageClick, firstNewImageRef }) => {
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
            largeImageURL={urls.regular}
            tags={alt_description}
            onClick={() => onImageClick(urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
        regular: PropTypes.string.isRequired,
      }).isRequired,
      alt_description: PropTypes.string,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
  firstNewImageRef: PropTypes.object.isRequired,
};

export default ImageGallery;
