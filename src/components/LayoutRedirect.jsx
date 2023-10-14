import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { Title } from "./Title";

export const LayoutRedirect = () => {
    const [loading, setLoading] = useState(true);
    const { searchData } = useFirestore();
    const params = useParams();

    useEffect(() => {
        searchData(params.nanoid).then((res) => {
        if (res.exists()) {
            location.href = res.data().origin;
        } else {
            setLoading(false);
        }
        });
    }, [params.nanoid, searchData]);

    if (loading) return <Title text="Cargando redirección..." />;

    return <Outlet />;
}