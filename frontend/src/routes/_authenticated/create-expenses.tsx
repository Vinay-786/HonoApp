import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form';
import { api } from '@/lib/api';
import { zodValidator } from "@tanstack/zod-form-adapter"

import { createPostSchema } from '@server/validatorTypes';

export const Route = createFileRoute('/_authenticated/create-expenses')({
    component: CreateExpenses,
})

function CreateExpenses() {
    const navigate = useNavigate();
    const form = useForm({
        validatorAdapter: zodValidator(),
        defaultValues: {
            title: '',
            amount: '0',
        },
        onSubmit: async ({ value }) => {
            const res = await api.expenses.$post({ json: value });
            if (!res.ok) {
                throw new Error("server error");
            }
            navigate({ to: "/expenses" });
        },
    });

    return (
        <div className="p-2 max-w-xl m-auto" >
            <h2> Create Expenses </h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <div>
                    {/* A type-safe field component*/}
                    <form.Field
                        name="title"
                        validators={{
                            onChange: createPostSchema.shape.title
                        }}
                        children={(field) => {
                            // Avoid hasty abstractions. Render props are great!
                            return (
                                <>
                                    <Label htmlFor={field.name}>Title</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />

                                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                                        <em>{field.state.meta.errors.join(", ")}</em>
                                    ) : null}
                                </>
                            )
                        }}
                    />
                </div>
                <div>
                    <form.Field
                        name="amount"
                        children={(field) => {
                            // Avoid hasty abstractions. Render props are great!
                            return (
                                <>
                                    <Label htmlFor={field.name}>Amount</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        type='number'
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />

                                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                                        <em>{field.state.meta.errors.join(", ")}</em>
                                    ) : null}
                                </>
                            )
                        }}
                    />
                </div>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button type="submit" disabled={!canSubmit}>
                            {isSubmitting ? '...' : 'Submit'}
                        </Button>
                    )}
                />
            </form>
        </div>
    );
}

