import Modal from "react-modal";
import { useState } from "react";
import LoginWithGoogleButton from "./googleButton";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import styles from "./login.module.css";

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, onClose }) => {
   const [loginState, setLoginState] = useState(false);

  const toggleForm = () => {
    setLoginState((prev) => !prev);
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
          {/* <LoginWithGoogleButton
            onSuccess={(user, token) => {
              console.log("Logged in as:", user.email);
              localStorage.setItem("accessToken", token);
              onClose();
            }}
          /> */}

          <button onClick={toggleForm} className={styles.toggleButton}>
            {loginState ? "Switch to Sign In" : "Switch to Sign Up"}
          </button>
        </header>

        <main className={styles["form-wrapper"]}>
          {loginState ? (
            <SignUp  onClose={onClose} />
          ) : (
            <SignIn  onClose={onClose} />
          )}
        </main>
      </div>
    </Modal>
  );
};

export default LoginModal;
