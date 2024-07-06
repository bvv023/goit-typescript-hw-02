// src/components/Loader/Loader.tsx
import { Circles } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={css.loader}>
      <Circles color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
