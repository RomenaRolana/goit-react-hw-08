import css from "./HomePage.module.css";
import img from "../../img/image.png";
const HomePage = () => {
  return (
    <div>
      <h1 className={css.title}>About this application</h1>
      <p className={css.text}>
        It is application for phonebook.
      </p>
      <img src={img} className={css.img} alt='fireSpot' />
    </div>
  );
};

export default HomePage;
