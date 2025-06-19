import axios from "axios";
import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import { SquareLoader } from "react-spinners";

const AuthForm = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { PORT, user, setUser, token, setToken } = useAppContext();



    async function loginHandler(e) {
        e.preventDefault();
        setLoading(true);
        const res = await axios.post(`${PORT}/users/login`, { username, password, email });
        setLoading(false);

        if (res.status === 200) {
            setUser(res.data.user);
            setToken(res.data.token);
            alert("Login successful");
        } else {
            console.error("Login failed", res.data);
            alert("Login failed");
        }
    }

    async function registerHandler(e) {
        e.preventDefault();
        setLoading(true);
        const res = await axios.post(`${PORT}/users/register`, { name: username, password, email });
        setLoading(false);
        if (res.status === 201) {
            setUser(res.data.user);
            setToken(res.data.token);
            alert("Registration successful");
        } else {
            console.error("Registration failed", res.data);
            alert("Registration failed");
        }
    }

    return (

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
            {/* Tabs */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setActiveTab("login")}
                    className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-all duration-200 ${activeTab === "login"
                        ? "text-white bg-blue-600"
                        : "text-blue-600 bg-blue-100"
                        }`}
                >
                    Login
                </button>
                <button
                    onClick={() => setActiveTab("register")}
                    className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-all duration-200 ml-2 ${activeTab === "register"
                        ? "text-white bg-blue-600"
                        : "text-blue-600 bg-blue-100"
                        }`}
                >
                    Register
                </button>
            </div>

            {/* Form Content */}
            {activeTab === "login" ? (
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 flex items-center justify-center gap-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        onClick={loginHandler}
                        disabled={!email || !password}
                    >
                        Login  <SquareLoader color="#DBEAFE" size="1em" loading={loading} />
                    </button>
                </form>
            ) : (
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        onClick={registerHandler}
                        disabled={!username || !email || !password}
                    >
                        Register {<SquareLoader color="#DBEAFE" size="1em" loading={loading} />}
                    </button>
                </form>
            )}
        </div>

    );
};

export default AuthForm;
