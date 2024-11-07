"use client"
import { Formik, Form, Field } from 'formik';

export default function Search() {

    const handleSearch = (values: { query: string }) => {
        // Implement your search logic here
        console.log('Search query:', values.query);
    };

    return (
        <Formik
            initialValues={{ query: '' }}
            onSubmit={handleSearch}
        >
            {() => (
                <Form className="flex justify-center w-full">
                    <Field
                        name="query"
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                    />
                </Form>
            )}
        </Formik>
    );
}

