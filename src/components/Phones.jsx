import { useLoaderData } from "react-router-dom";
import PhoneCard from "./PhoneCard";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

const Phones = () => {
    const loadedPhones = useLoaderData();
    const [phones, setPhones] = useState(loadedPhones);
    const {user} = useContext(AuthContext);
    const handleDelete = (id) => {
        fetch(`https://phone-db-server.vercel.app/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount === 1) {
                alert('Deleted successfully');
                const remaining = phones.filter(phone => phone._id !== id);
                setPhones(remaining);
            } else {
                alert('Deletion failed');
            }
        });
    };
    const handleOrder = (id) => {
        const currentPhone = phones.find(phone => phone._id === id);
        currentPhone.userEmail = user.email;
        delete currentPhone._id;

        fetch('https://phone-db-server.vercel.app/order', {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(currentPhone)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                alert('Ordered successfully');
            } else {
                alert('Order failed');
            }
        });
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center">Here are all phones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    phones.map(phone => <PhoneCard key={phone._id} handleDelete={handleDelete} handleOrder={handleOrder} phone={phone}></PhoneCard>)
                }
            </div>
        </div>
    );
};

export default Phones;