import Modal from "react-modal";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import styles from "./login.module.css";

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, onClose, sendUser }) => {
  const [loginState, setLoginState] = useState(false); 
  const [error, setError] = useState(null);
 

  const toggleForm = () => {
    setLoginState((prev) => !prev);
    setError(null);
  };

  const getData = async ({ submitFn, values }) => {
    try {
      const result = await submitFn(values);
      console.log(result);
      sendUser(result); 
    onClose()
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>

          <button onClick={toggleForm} className={styles.toggleButton}>
            {loginState ? "Switch to Sign In" : "Switch to Sign Up"}
          </button>
        </header>

        <main className={styles["form-wrapper"]}>
          {loginState ? (
            <SignUp sendData={getData} onClose={onClose} />
          ) : (
            <SignIn sendData={getData} onClose={onClose} />
          )}
          {error && (
            <div className={styles["error-container"]}>
              {error.message || "Something went wrong"}
            </div>
          )}
        </main>
      </div>
    </Modal>
  );
};

export default LoginModal;
