import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ErrorBoundary(){
    const error = useRouteError();

    return (
        <>
            <Header/>
            <main className="page">
                <div className="page__container">
                    <h1 className="h1">{error.status ? error.status : "Error detected!"}</h1>
                    <h2 className="h2"><i>{error.message}.</i></h2>
                    <h3 className="h3">Please, refer to other helpful links</h3>
                </div>
            </main>
        </>
    )
}