import { useRouteError } from "react-router-dom";
import { toast } from "react-toastify";

export default function ErrorPage() {
    const routerError = useRouteError();

    return toast.error(routerError.message);
}