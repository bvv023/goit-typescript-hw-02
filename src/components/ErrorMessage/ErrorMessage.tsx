// src/components/ErrorMessage/ErrorMessage.tsx
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  useEffect(() => {
    toast.error(message);
  }, [message]);

  return null;
};

export default ErrorMessage;
