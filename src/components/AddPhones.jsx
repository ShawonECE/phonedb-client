import axios from 'axios';

const AddPhones = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const model = form.model.value;
        const brand = form.brand.value;
        const price = form.price.value;
        const display = form.display.value;
        const ram = form.ram.value;
        const storage = form.storage.value;
        const cpu = form.cpu.value;
        const data = {model, brand, price, features: {display, ram, storage, cpu}};

        axios.post('https://phone-db-server.vercel.app', data)
        .then(data => {
            if (data.data.insertedId) {
                alert('Data Inserted successfully');
                form.reset();
            } else {
                alert('Data Inserted failed');
            }
        });
    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Add Phones!</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Model</span>
                            </label>
                            <input type="text" name="model" placeholder="Enter Model" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Brand</span>
                            </label>
                            <input type="text" name="brand" placeholder="Enter Brand" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" name="price" placeholder="Enter price" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Display</span>
                            </label>
                            <input type="text" name="display" placeholder="Enter display type" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Ram</span>
                            </label>
                            <input type="text" name="ram" placeholder="Enter Ram size" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Storage</span>
                            </label>
                            <input type="text" name="storage" placeholder="Enter storage size" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">CPU</span>
                            </label>
                            <input type="CPU" name="cpu" placeholder="Enter CPU model" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-gray-900 text-white">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPhones;