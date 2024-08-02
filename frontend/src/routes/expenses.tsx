import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export const Route = createFileRoute('/expenses')({
    component: Expenses,
})

async function getAllExpenses() {
    const res = await api.expenses.$get()
    if (!res.ok) {
        throw new Error("server error")
    }
    const data = await res.json()
    return data
}

function Expenses() {
    const { isPending, error, data } = useQuery({
        queryKey: ['get-all-expenses'], queryFn: getAllExpenses
    });

    if (error) return "An error has occurred: " + error.message;
    return (
        <div className='p-2'>
            <pre>
                {isPending ? "..." : JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );

}

