"use client";
import useSession from "@/hooks/useSession";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Registration() {
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

    return <RegisterForm />;
}

function RegisterForm() {
    const { register } = useSession();

    return (
        <Formik
            initialValues={{ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                lastName: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
                email: Yup.string().email("Invalid email address").required("Required"),
                password: Yup.string()
                    .min(8, "Must Be 8 Characters Long")
                    .required("Required"),
                confirmPassword: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Passwords must match"
                ),
            })}
            onSubmit={(values, { setSubmitting }) => {
                const registerObject = {
                    name: values.firstName + " " + values.lastName,
                    email: values.email,
                    password: values.password,
                    admin: false,
                    contributor: false,
                    moderator: false,
                    birthdate: new Date(),
                    bio: "",
                    city: "",
                    state: "",
                    country: "",
                };

                register(registerObject, {
                    optimisticData: {
                        isLoggedIn: true,
                        registerObject,
                    },
                });
            }}
        >
            <Form className="space-y-6 bg-white p-8 px-20 shadow-md rounded-md w-full mx-auto">
                <div className="flex flex-col">
                    <label
                        htmlFor="firstName"
                        className="text-sm font-medium text-gray-700"
                    >
                        First Name
                    </label>
                    <Field
                        name="firstName"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your first name"
                    />
                    <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="lastName"
                        className="text-sm font-medium text-gray-700"
                    >
                        Last Name
                    </label>
                    <Field
                        name="lastName"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your last name"
                    />
                    <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <Field
                        name="email"
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your email"
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
                    />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <Field
                        name="confirmPassword"
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Re-enter your password"
                    />
                    <ErrorMessage
                        name="confirmPassword"
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
