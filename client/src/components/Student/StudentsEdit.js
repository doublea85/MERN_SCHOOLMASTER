import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

function StudentsEdit({ studentId }) {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/student/${studentId}`)
      .then((response) => {
        const { firstName, lastName, email, address } = response.data;
        setInitialValues({
          firstName,
          lastName,
          email,
          address,
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch student details");
      });
  }, [studentId]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/student/updatestudent/${studentId}`,
        values
      );
      toast.success(response.data.msg);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update student");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-4">Edit Student Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 max-w-md mx-auto">
            <label htmlFor="firstName" className="font-bold">
              First Name
            </label>
            <Field
              type="text"
              name="firstName"
              className="border border-gray-400 p-2"
            />
            <ErrorMessage name="firstName" className="text-red-500" />

            <label htmlFor="lastName" className="font-bold">
              Last Name
            </label>
            <Field
              type="text"
              name="lastName"
              className="border border-gray-400 p-2"
            />
            <ErrorMessage name="lastName" className="text-red-500" />

            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <Field
              type="email"
              name="email"
              className="border border-gray-400 p-2"
            />
            <ErrorMessage name="email" className="text-red-500" />

            <label htmlFor="address" className="font-bold">
              Address
            </label>
            <Field
              type="text"
              name="address"
              className="border border-gray-400 p-2"
            />
            <ErrorMessage name="address" className="text-red-500" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StudentsEdit;
