import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from "@/lib/api"

export const Route = createFileRoute('/_authenticated/expenses')({
    component: Expenses,
})

function Expenses() {
    const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);
    const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOptions);

    if (error) return "An error has occurred: " + error.message;
    return (
        <div className='p-2 max-w-3xl m-auto'>
            <Table>
                <TableCaption>A list of all your expense.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loadingCreateExpense?.expense && (
                        <TableRow>
                            <TableCell className="font-medium">
                                <Skeleton className="h-4" />
                            </TableCell>
                            <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
                            <TableCell>{loadingCreateExpense?.expense.amount}</TableCell>
                            <TableCell>{loadingCreateExpense?.expense.date.split("T")[0]}</TableCell>
                        </TableRow>
                    )}
                    {isPending
                        ? Array(3)
                            .fill(0)
                            .map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">
                                        <Skeleton className="h-4" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4" />
                                    </TableCell>
                                </TableRow>
                            ))
                        : data?.expenses.map((expense) => (
                            <TableRow key={expense.id}>
                                <TableCell className="font-medium">{expense.id}</TableCell>
                                <TableCell>{expense.title}</TableCell>
                                <TableCell>{expense.amount}</TableCell>
                                <TableCell>{expense.date.split("T")[0]}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );

}

