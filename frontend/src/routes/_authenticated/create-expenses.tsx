import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form';
import { createExpense, getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { zodValidator } from "@tanstack/zod-form-adapter"

import { createPostSchema } from '@server/validatorTypes';
import { expenses } from '@server/db/schema/expenses';

export const Route = createFileRoute('/_authenticated/create-expenses')({
    component: CreateExpenses,
})

function CreateExpenses() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const form = useForm({
        validatorAdapter: zodValidator(),
        defaultValues: {
            title: '',
            amount: '0',
            date: new Date().toISOString(),
        },
        onSubmit: async ({ value }) => {
            const existingExpense = await queryClient.ensureQueryData(getAllExpensesQueryOptions);

            navigate({ to: "/expenses" });

            //loading state
            queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, { expense: value })

            try {
                const newExpense = await createExpense({ value });

                queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
                    ...existingExpense,
                    expenses: [newExpense, ...existingExpense.expenses],
                });
            } catch (error) {
                //error state
            } finally {
                queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {})
            }


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
                        validators={{
                            onChange: createPostSchema.shape.amount
                        }}
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
                <div>
                    <form.Field
                        name="date"
                        validators={{
                            onChange: createPostSchema.shape.date
                        }}
                        children={(field) => {
                            // Avoid hasty abstractions. Render props are great!
                            return (
                                <div className='self-center'>
                                    <Calendar
                                        mode="single"
                                        selected={new Date(field.state.value)}
                                        onSelect={(date) => field.handleChange((date ?? new Date()).toISOString())}
                                        className="rounded-md border"
                                    />

                                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                                        <em>{field.state.meta.errors.join(", ")}</em>
                                    ) : null}
                                </div>
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

