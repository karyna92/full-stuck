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
    setError(null); 
  };

  const getData = async ({ submitFn, values }) => {
    try {
      const result = await submitFn(values);
      
      console.log(result.data)
      
      props.sendUser(result.data);
      navigate("/user");
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
          <button onClick={props.onClose} className={styles.closeButton}>
            ×
          </button>

          <button onClick={buttonHandler} className={styles.toggleButton}>
            {loginState ? "Switch to Sign In" : "Switch to Sign Up"}
          </button>
        </header>

        <main className={styles["form-wrapper"]}>
          {loginState ? (
            <SignUp sendData={getData} onClose={props.onClose} />
          ) : (
            <SignIn sendData={getData} onClose={props.onClose} />
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
