import PropTypes from 'prop-types';
import css from './ImageCard.module.css';

const ImageCard = ({ webformatURL, tags, onClick }) => {
  return (
    <div className={css.card} onClick={onClick}>
      <img src={webformatURL} alt={tags} className={css.image} />
    </div>
  );
};

ImageCard.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
