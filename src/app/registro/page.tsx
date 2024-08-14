import RegisterForm from "../componentes/RegistroForm/RegistroForm";
import HomeButton from "../componentes/HomeButton/homebutton";
import styles from "./page.module.css";
import BackButton from "../componentes/BackButton/backbutton";

const RegisterPage = () => {
  return (
    <div className={styles.background}>
      <div className={styles.btns}>
        <HomeButton />
        <BackButton />
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
