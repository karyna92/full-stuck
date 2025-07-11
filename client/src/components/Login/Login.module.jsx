import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import styles from "./login.module.css";

Modal.setAppElement("#root");

const LoginModal = (props) => {
  const [loginState, setLoginState] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const buttonHandler = () => {
    setLoginState((prev) => !prev);
  };

  const getData = async ({ submitFn, values }) => {
    try {
      const result = await submitFn(values);
      props.sendUser(result.data);
      navigate("/userProfile");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      className={styles.modal}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={buttonHandler} className={styles.toggleButton}>
            {loginState ? "SignIn" : "SignUp"}
          </button>
        </header>

        <main className={styles["form-wrapper"]}>
          {loginState ? (
            <SignUp sendData={getData} />
          ) : (
            <SignIn sendData={getData} />
          )}
          {error && (
            <div className={styles["error-container"]}>{error.err}</div>
          )}
        </main>
      </div>
    </Modal>
  );
};

export default LoginModal;
