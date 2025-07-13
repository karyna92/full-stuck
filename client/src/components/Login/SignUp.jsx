import { Formik, Form, Field } from "formik";
import { format } from "date-fns";
import { registerUser } from "../../api/userApi";
import styles from "./login.module.css";

const SignUp = (props) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: format(new Date(), "yyyy-MM-dd"),
    address: "",
  };

  const onSubmit = (values, actions) => {
    props.sendData({
      submitFn: registerUser,
      values,
    });
    actions.resetForm();
    props.onClose()
  };

  return (
    <div className={styles.formSection}>
      <h2 className={styles.formTitle}>Sign Up</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
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
            <button type="submit" className={styles.submitButton}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
