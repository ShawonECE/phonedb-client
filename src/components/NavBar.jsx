import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { LuUserCircle } from "react-icons/lu";

const NavBar = () => {
    const {user, logOutUser, loading} = useContext(AuthContext);
    const handleLogOut = () => {
        logOutUser()
        .then(res => console.log(res))
        .catch(error => console.error(error));
    };
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">PhoneDB</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-1">
                    <li><NavLink to="/">Phones</NavLink></li>
                    <li><NavLink to="/add">Add Phones</NavLink></li>
                    <li><NavLink to="/orders">Orders</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {
                    !loading && (user?.photoURL? 
                        <div className="avatar tooltip tooltip-bottom" data-tip={user.displayName}>
                            <div className="w-8 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </div>
                        :
                        <LuUserCircle className="text-[32px]" />)
                }
                {
                    loading && 
                    <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                }
                {
                    !loading && (user ?
                        <button onClick={handleLogOut} className="btn">Log Out</button>
                        :
                        <Link to='/login'><button className="btn">Log In</button></Link>)
                }
                {
                    loading &&
                    <div className="skeleton w-24 h-12"></div>
                }
            </div>
        </div>
    );
};

export default NavBar;