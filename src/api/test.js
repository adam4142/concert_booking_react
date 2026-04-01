import {useEffect} from "react";
import {axiosInstance} from "./config";


function test(){

    useEffect(() => {
        const app = async () => {
            try {
                const result = await axiosInstance.get('/api/listConcerts'), {
                    header
                }
            }
        }
    }, []);
}