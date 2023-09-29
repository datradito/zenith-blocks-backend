import { useRouteError } from "react-router-dom";
import { toast } from "react-toastify";

export default function ErrorPage() {
    const routerError = useRouteError();

    console.log(routerError);

    return toast.error(routerError.message || "Something went wrong! Please try again later.");
}