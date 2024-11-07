"use client"
import * as css from "@/app/css";
import useSession from "@/hooks/useSession";
import useTopic from "@/hooks/useTopic";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


export default function TopicForm() {
    const { isLoading, session } = useSession();

    if (isLoading) {
        return <p className="text-lg">Loading...</p>;
    }


    return <NewTopicForm />;
}


function NewTopicForm() {
    const { session } = useSession();
    const { createTopic } = useTopic()

    return (
        <Formik
            initialValues={{ title: "", description: "" }}
            validationSchema={Yup.object({
                title: Yup.string().required("Required"),
                description: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                const topicObject = {
                    _id: "",
                    creator: {
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
                    },
                    title: values.title,
                    description: values.description,
                    up_votes: 0,
                    down_votes: 0,
                    args: [],
                }
                createTopic(topicObject, {
                    optimisticData: {
                        isLoggedIn: true,
                        topicObject,
                    },
                }).then((res) => {
                    console.log("response: ", res);
                });
            }}
        >
            <Form className="space-y-6 bg-white p-8 px-20 shadow-md rounded-md w-full mx-auto">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-indigo-900 py-4">
                        Create a New Topic
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
                        placeholder="Please, Give Context and Details Regarding Your Propostition."
                    />
                    <ErrorMessage
                        name="description"
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
