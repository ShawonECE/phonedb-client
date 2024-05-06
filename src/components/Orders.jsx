import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

const Orders = () => {
    const {user} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get(`https://phone-db-server.vercel.app/orders?email=${user.email}`, {withCredentials: true})
        .then(data => {
            console.log(data);
            setOrders(data.data);
        })
    }, [user]);
    return (
        <div>
            <h2 className="text-4xl font-semibold">Here is your orders: {orders.length}</h2>
        </div>
    );
};

export default Orders;