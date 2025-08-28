import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchUsers } from "./actions";

export const useUserService = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Sélectionner les utilisateurs, le statut et les erreurs depuis Redux
    const { users, userStatus, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers()); // ✅ Correct : on dispatch l'action Redux
    }, [dispatch]);

    return { users, userStatus, error };
};
