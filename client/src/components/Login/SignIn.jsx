import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";
import styles from "./login.module.css";

const SignIn = ({ onClose }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

const onSubmit = async (values, actions) => {
  const resultAction = await dispatch(loginUser(values));
  if (loginUser.fulfilled.match(resultAction)) {
    onClose();
  } else {
    actions.setSubmitting(false);
  }
};

  return (
    <div className={styles.formSection}>
      <h2 className={styles.formTitle}>Sign In</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form className={styles.form}>
            <Field
              name="email"
              placeholder="Type your email"
              className={styles.input}
            />
            <Field
              name="password"
              placeholder="Type your password"
              className={styles.input}
              type="password"
            />
            <button type="submit" className={styles.submitButton}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            {error && <div className={styles.error}>{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
