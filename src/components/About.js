import {useEffect} from "react";
import {axiosInstance} from "../api/config";


function About() {
    const getUsers = async () => {
        const result = await axiosInstance.get("/api/user", {
            headers : {
                Authorization : `Bearer b7gAaCRmWFUhdpX5ZL9sTtVcLdEmhP1m3FG4U0dX13oLpZncQXlIXVOaWVG5`
            }
        })
        console.log(result.data)
    }
    useEffect(() => {
        getUsers()
    }, []);
    return (<div>
        <h1>About Project</h1>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
    </div>);
}

export default About;