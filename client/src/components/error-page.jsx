import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    
    return (
        <div id="error-page" className="flex flex-col items-center">
            <h1>Oops!</h1>
            <p>Apologies adventurer! You have found an uncharted land!</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}