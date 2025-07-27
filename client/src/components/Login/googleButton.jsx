import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { loginUser } from "../../api/userApi"; 

const LoginWithGoogleButton = ({ onSuccess }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const firebaseToken = await user.getIdToken();
      console.log("Google user:", user);
      console.log("Token:", firebaseToken);

      const {user: backendUser} = await loginUser({ firebaseToken });

      console.log("Backend user:", backendUser);

      if (onSuccess) onSuccess(backendUser);

      return backendUser;
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <button onClick={handleLogin} className="google-login-btn">
      🔐 Login with Google
    </button>
  );
};

export default LoginWithGoogleButton;
