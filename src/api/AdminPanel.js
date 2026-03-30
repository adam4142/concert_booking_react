import {axiosInstance} from "./config";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


function AdminPanel() {

    const user = useSelector(store => store.auth.user);

    const getUsers = async () => {
        const result = await axiosInstance.get("/api/user", {
            headers: {
                'Authorization': "Bearer " + user.token
            }
        })
        console.log(result.data)
    }

    useEffect(() => {
        getUsers()
    }, []);
}
export default AdminPanel;