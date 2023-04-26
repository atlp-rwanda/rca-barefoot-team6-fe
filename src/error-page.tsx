import { useRouteError, useNavigate } from "react-router-dom";
import Button from "./components/atoms/Button";

export default function ErrorPage() {
  const error:{status: string; statusText: string} = useRouteError() as {status: string; statusText: string};
  const navigate = useNavigate();
  console.error(error);
 

  return (
    <div id="error-page" className="h-screen flex items-center">
      <div className="mx-auto text-center">
      <h1 className="font-bold text-xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-red-500">
        {error?.status} | {error?.statusText}
      </p>
      <Button
      outline
      onClick={()=>{navigate(-1)}} 
      className="mt-3">Back</Button>
      </div>
    </div>
  );
}