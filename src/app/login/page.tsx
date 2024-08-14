import LoginForm from "../componentes/LoginForm/LoginForm";
import HomeButton from "../componentes/HomeButton/homebutton";
import Image from "next/image";
import styles from "./page.module.css";
import BackButton from "../componentes/BackButton/backbutton";

const LoginPage = () => {
  return (
    <div className={styles.background}>
      <div className={styles.btns}>
        <HomeButton />
        <BackButton />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
