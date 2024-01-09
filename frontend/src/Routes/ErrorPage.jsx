import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 401) {
    // the response json is automatically parsed to
    // `error.data`, you also have access to the status
    return toast.error(
      "Something went wrong! Please try again later."
    );
  }

  // rethrow to let the parent error boundary handle it
  // when it's not a special case for this route
  console.error(error);
}
