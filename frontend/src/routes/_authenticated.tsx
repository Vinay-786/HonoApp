import { createFileRoute, Outlet } from "@tanstack/react-router"
import { userQueryOptions } from "@/lib/api"

const Login = () => {
    return (
        <>
            <div> You have to Login </div>
            <a href="/api/login"> Login </a>
        </>
    );
}

const Component = () => {
    const { user } = Route.useRouteContext();
    if (!user) {
        return <Login />
    }

    return <Outlet />
};

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ context }) => {
        const queryClient = context.queryClient

        try {
            const data = await queryClient.fetchQuery(userQueryOptions);
            return data;
        } catch (e) {
            return { user: null }
        }
    },
    component: Component,
});
