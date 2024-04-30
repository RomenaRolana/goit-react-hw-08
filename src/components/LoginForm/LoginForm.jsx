import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchApiLogIn } from "../../redux/auth/operations";
import css from "../RegisterForm/RegisterForm.module.css";
const loginBoxSchema = Yup.object().shape({
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
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log("values", values);
    dispatch(fetchApiLogIn(values));
    actions.resetForm();
  };

  return (
    <div>
      <h1 className={css.titleRegistration}>Login To Your Account 👇 </h1>

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={loginBoxSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span className={css.span}>Email</span>
            <br />
            <Field
              className={css.input}
              type='email'
              name='email'
              placeholder='Enter your email'
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
              placeholder='Enter your password'
            />
            <ErrorMessage name='password' component='div' />
          </label>
          <br />
          <button type='submit' onSubmit={handleSubmit}>
            LogIn ✅
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
