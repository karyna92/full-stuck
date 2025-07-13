import { Formik, Form, Field } from "formik";
import { loginUser } from "../../api/userApi";
import styles from "./login.module.css";

const SignIn = (props) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values, actions) => {
    props.sendData({
      submitFn: loginUser,
      values,
    });
    actions.resetForm();
    props.onClose()
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
              Sign in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
