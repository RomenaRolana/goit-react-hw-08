import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./RegisterForm.module.css";
import { useDispatch } from "react-redux";
import { fetchApiRegister } from "../../redux/auth/operations";

const RegisterBoxSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address"
    )
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .required("A Password is required"),
});

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log("values", values);
    dispatch(fetchApiRegister(values));
    actions.resetForm();
  };

  return (
    <div>
      <h1 className={css.titleRegistration}>Welcome at registration</h1>
      {/* <p className={css.}>Please enter your email and password for registration 😊</p> */}
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={RegisterBoxSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span className={css.span}>Name</span>
            <br />
            <Field
              className={css.input}
              type='name'
              name='name'
              placeholder='Real name'
            />
            <ErrorMessage name='name' component='div' />
          </label>
          <br />
          <label className={css.label}>
            <span className={css.span}>Email</span>
            <br />
            <Field
              className={css.input}
              type='email'
              name='email'
              placeholder='e-mail adress'
            />
            <ErrorMessage name='email' component='div' />
          </label>
          <br />
          <label className={css.label}>
            <span className={css.span}>Password</span>
            <br />
            <Field
              className={css.input}
              type='password'
              name='password'
              placeholder='Enter the password'
            />
            <ErrorMessage name='password' component='div' />
          </label>
          <br />
          <button type='submit' onSubmit={handleSubmit}>
            Registration ✅
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
