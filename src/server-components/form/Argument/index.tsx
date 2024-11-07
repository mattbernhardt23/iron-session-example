"use client";
import useTopic from "@/hooks/useTopic";
import useSession from "@/hooks/useSession";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ArgumentFormProps {
    supporting: boolean;
    topic_id: string;
}

const ArgumentForm = ({ supporting, topic_id }: ArgumentFormProps) => {
    const { session } = useSession();
    const { addArgument } = useTopic();

    // Set dynamic title and styles based on `supporting` prop
    const title = supporting ? "Create a Supporting Argument" : "Create an Objection";
    const titleColor = supporting ? "text-green-600" : "text-red-600";
    const buttonColor = supporting ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700";

    return (
        <Formik
            initialValues={{ title: "", description: "" }}
            validationSchema={Yup.object({
                title: Yup.string().required("Required"),
                description: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                const creator = {
                    _id: session.id,
                    name: {
                        title: "",
                        first: "",
                        last: "",
                    },
                    img: {
                        large: "",
                        medium: "",
                        thumbnail: "",
                    }
                };
                const argumentObject = {
                    _id: "",
                    topic_id,
                    creator,
                    title: values.title,
                    description: values.description,
                    supporting,
                    up_votes: 0,
                    down_votes: 0,
                };
                addArgument(argumentObject, {
                    optimisticData: {
                        isLoggedIn: true,
                        argumentObject,
                    },
                });
                setSubmitting(false);
            }}
        >
            <Form className="space-y-6 bg-white p-8 px-20 shadow-md rounded-md w-full mx-auto">
                {/* Dynamically change the title text and color */}
                <div className="flex flex-col">
                    <h1 className={`text-2xl font-semibold py-4 ${titleColor}`}>
                        {title}
                    </h1>
                    <label
                        htmlFor="title"
                        className="text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <Field
                        name="title"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Create a Headline for What You are Proposing"
                    />
                    <ErrorMessage
                        name="title"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <Field
                        name="description"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Please, Give Context and Details Regarding Your Proposition."
                    />
                    <ErrorMessage
                        name="description"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                    />
                </div>

                {/* Dynamically change the button color */}
                <div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonColor}`}
                    >
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default ArgumentForm;

