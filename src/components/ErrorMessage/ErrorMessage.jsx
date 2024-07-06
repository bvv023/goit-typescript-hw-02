import { useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

const ErrorMessage = ({ message }) => {
  useEffect(() => {
    toast.error(message);
  }, [message]);

  return null;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
