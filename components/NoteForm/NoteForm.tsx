import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

interface NoteFormValues {
    title: string,
    content: string,
    tag: string;
};

const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "",
}

const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title is too long")
        .required("Title is required"),
    content: Yup.string()
        .max(500, "Text is too long"),
    tag: Yup.string()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
        .required("Tag is required"),
    
})

interface NoteFormProps {
    onClose:() => void
}

export default function NoteForm({onClose}: NoteFormProps) {
    const fieldId = useId();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            onClose();
        }
    });

    const handleSubmit = (
        values: NoteFormValues,
    ) => {
        mutation.mutate(values);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={NoteFormSchema} onSubmit={handleSubmit}>
            {({isSubmitting}) => (<Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
                    <ErrorMessage component="span" name="title" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <Field as="textarea"
                        id={`${fieldId}-content`}
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage component="span" name="content" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
                        <option value="" disabled> Select a tag </option>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage component="span" name="tag" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button
                        type="button"
                        className={css.cancelButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={isSubmitting || mutation.isPending} 
                    >
                        Create note
                    </button>
                </div>
            </Form>)}
        </Formik>
    );
}