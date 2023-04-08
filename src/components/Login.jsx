import axios from "axios";
import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Layout/Loader";
import { AuthContext } from "./AuthContext";
import './Login.css'
import { API_URL } from "../API_URL";
import { login, register } from "../service";

const Login = () => {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const { isAuthenticated, setIsAuthenticated, setUser: setCurrentUser, loading, setLoading , error, setError } = useContext(AuthContext);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("/images/defaultProfile.png");
    const [avatarPreview, setAvatarPreview] = useState("/images/defaultProfile.png");

    const loginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const response = await login({ email:loginEmail, password:loginPassword });
        if (response?.data?.success) {
            toast.success('Logged in Successfully');
            setCurrentUser(response.data.user);
            setIsAuthenticated(true);
        } else {
            setError(response || 'Please Try After Sometime!')
        }
        setLoading(false);
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        const response = await register(myForm);
        if (response?.data?.success) {
            toast.success('Registered Successfully');
            setCurrentUser(response.data.user);
            setIsAuthenticated(true);
        } else {
            setError(response || 'Please Try After Sometime!')
        }
        setLoading(false);
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if(error){
            toast.error(error);
        }
    }, [error]);
    return (
        <>
            <div className="loginWrapper w-screen h-screen flex justify-center items-center">
                {loading ? (
                    <Loader />
                ) : (
                    <div class="main w-80 md:w-2/5 h-[30rem] rounded-3xl shadow-2xl shadow-black">
                        <input type="checkbox" id="chk" aria-hidden="true" />
                        <div class="signup">
                            <form encType="multipart/form-data" onSubmit={registerSubmit}>
                                <label for="chk" className="label text-4xl" aria-hidden="true">
                                    Sign up
                                </label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                                <button className="button" type="submit">
                                    Sign up
                                </button>
                            </form>
                        </div>
                        <div class="login">
                            <form onSubmit={loginSubmit}>
                                <label for="chk" className="label text-4xl" aria-hidden="true">
                                    Login
                                </label>
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                                <button className="button" type="submit">
                                    Login
                                </button>
                                <div className="flex justify-center">
                                    <Link
                                        className="font-poppins hover:font-bold hover:text-purple-500"
                                        to="/password/forgot"
                                    >
                                        Forgot Password ?
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Login