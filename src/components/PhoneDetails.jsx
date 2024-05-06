import axios from 'axios';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const PhoneDetails = () => {
    const loadedPhone = useLoaderData().data;
    const [phone, setPhone] = useState(loadedPhone);
    const {model, brand, price, features, _id} = phone;
    const {display, ram, storage, cpu} = features;
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            price: form.price.value,
            features: {
                display: form.display.value,
                ram: form.ram.value,
                storage: form.storage.value,
                cpu: form.cpu.value
            }
        };

        axios.put(`https://phone-db-server.vercel.app/update/${_id}`, updatedData)
        .then(data => {
            if (data.data.modifiedCount === 1) {
                alert('Updated successfully');
                const newData = {model, brand, ...updatedData};
                setPhone(newData);
            } else {
                alert('Updated failed');
            }
        });
    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">{brand} {model}</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleUpdate} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" name="price" defaultValue={price} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Display</span>
                            </label>
                            <input type="text" name="display" defaultValue={display} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Ram</span>
                            </label>
                            <input type="text" name="ram" defaultValue={ram} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Storage</span>
                            </label>
                            <input type="text" name="storage" defaultValue={storage} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">CPU</span>
                            </label>
                            <input type="CPU" name="cpu" defaultValue={cpu} className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-gray-900 text-white">Update info</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PhoneDetails;