import { Formik, Form, Field } from "formik";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/userSlice";
import styles from "./login.module.css";

const SignUp = ({ onClose }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: format(new Date(), "yyyy-MM-dd"),
    address: "",
  };

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const onSubmit = async (values, actions) => {
    const resultAction = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(resultAction)) {
      onClose();
    } else {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.formTitle}>Sign Up</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <Field
              name="firstName"
              placeholder="Type your name"
              className={styles.input}
            />
            <Field
              name="lastName"
              placeholder="Type your last name"
              className={styles.input}
            />
            <Field
              name="email"
              placeholder="Type your email"
              className={styles.input}
              type="email"
            />
            <Field
              name="password"
              placeholder="Type your password"
              className={styles.input}
              type="password"
            />
            <Field name="birthday" type="date" className={styles.input} />
            <Field
              name="address"
              placeholder="Type your address"
              className={styles.input}
            />
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            {error && <div className={styles.error}>{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
