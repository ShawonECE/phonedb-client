import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { signInWithGoogle, signInWithGithub, signInUser, setLoading, user } = useContext(AuthContext);
    const onSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(() => {
                axios.post('https://phone-db-server.vercel.app/jwt', {user: email}, {withCredentials: true})
                .then(data => {
                    if(data.data.success) {
                        if (location?.state?.to) {
                            navigate(location.state.to);
                        } else {
                            alert('You have successfully logged in');
                            navigate('/');
                        }
                    }
                })
                
            })
            .catch(() => {
                setLoading(false);
                alert('Log in failed');
            });
    };
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(() => {
            if (location?.state?.to) {
                navigate(location.state.to);
            } else {
                alert('You have successfully logged in');
                navigate('/');
            }
        })
        .catch(error => {
            setLoading(false);
            console.error(error);
            alert('Log in failed');
        })
    };
    const handleGithubSignIn = () => {
        signInWithGithub()
        .then(() => {
            if (location?.state?.to) {
                navigate(location.state.to);
            } else {
                alert('You have successfully logged in');
                navigate('/');
            }
        })
        .catch(error => {
            setLoading(false);
            console.error(error);
            alert('Log in failed');
        })
    };
    return (
        <div className="hero min-h-screen bg-base-200 rounded-2xl">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login here to get all access!</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                        {
                            location.state?.from === '/register' &&
                            <h2 className="text-center text-lg font-semibold text-green-400">You are registered. Now please log in</h2>
                        }
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Enter your email" className="input input-bordered" {...register("email", { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
                                    message: 'Please enter a valid email address'
                                } })} />
                            <p className="text-red-500 mt-2">{errors.email?.message}</p>
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" className="input input-bordered" {...register("password", {
                                required: 'Password is required', 
                            })} />
                            {
                                showPassword ? 
                                <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-6 cursor-pointer text-lg" />
                                :
                                <FaRegEye onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-6 cursor-pointer text-lg" />
                            }
                            <p className="text-red-500 mt-2">{errors.password?.message}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-slate-800 text-white" disabled={user}>Log in</button>
                        </div>                        
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn mx-8 -mt-6 mb-2" disabled={user}><FaGoogle />Log in with Google</button>
                    <button onClick={handleGithubSignIn} className="btn mx-8 mb-3" disabled={user}><FaGithub />Log in with GitHub</button>
                    <p className="text-center mb-8">
                        <Link to='/register' state={location.state?.to} className="label-text-alt link link-hover">Don&apos;t have an account? Register now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;