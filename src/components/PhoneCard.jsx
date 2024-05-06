import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PhoneCard = ({phone, handleDelete, handleOrder}) => {
    const navigate = useNavigate();
    const {model, brand, price, _id} = phone;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{brand} {model}</h2>
                <p className='text-lg font-semibold'>${price}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => navigate(`/details/${_id}`)} className="btn bg-gray-900 text-white">View details</button>
                    <button onClick={() => handleDelete(_id)} className="btn bg-gray-900 text-white">Delete</button>
                    <button onClick={() => handleOrder(_id)} className="btn bg-gray-900 text-white">Order now</button>
                </div>
            </div>
        </div>
    );
};

PhoneCard.propTypes = {
    phone: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleOrder: PropTypes.func.isRequired
};

export default PhoneCard;