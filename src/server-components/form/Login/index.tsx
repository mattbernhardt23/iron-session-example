"use client"
import * as css from "@/app/css";
import useSession from "@/hooks/useSession";
import { defaultSession } from "@/lib/sessionOptions";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


export default function Login() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <p className="text-lg">Loading...</p>;
    }

    if (session.isLoggedIn) {
        return (
            <>
                <p className="text-lg">
                    Logged in user: <strong>{session.email}</strong>
                </p>
            </>
        );
    }

    return <LoginForm />;
}

function LoginForm() {
    const { login } = useSession();

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email address").required("Required"),
                password: Yup.string()
                    .min(4, "Must Be 8 Characters Long")
                    .required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                const loginObject = {
                    email: values.email,
                    password: values.password
                }
                login(loginObject, {
                    optimisticData: {
                        isLoggedIn: true,
                        loginObject,
                    },
                });
            }}
        >
            <Form className="space-y-6 bg-white p-8 px-20 shadow-md rounded-md w-full mx-auto">


                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <Field
                        name="email"
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your email"
                        defaultValue="nellie.sutton@example.com"
                    />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <Field
                        name="password"
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your password"
                        defaultValue="1216"
                    />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    );
}

