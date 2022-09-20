import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useBorderRedirect } from "./useBorderRedirect";

export const BoardRedirect:FC = () => {
    const {boardId} = useBorderRedirect();
    return (boardId ? <Navigate to={`/${boardId}/`}/> : <div> Необходимо создать доску</div>);
}