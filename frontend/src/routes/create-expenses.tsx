import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-expenses')({
    component: CreateExpenses,
})

function CreateExpenses() {
    return <div className="p-2">Show all CreateExpenses!</div>
}

