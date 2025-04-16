"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import Link from "next/link"
import toast from "react-hot-toast";
import { useState } from "react";
// import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {    
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setData(res.data.data._id);
        } catch (error: any) {
            console.log(error.message);
            toast.error("Failed to fetch user details");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-green-500">
                {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-gray-500 hover:bg-gray-700 mt-4 text-white font-bold py-2 px-4 rounded">
                Get User Details
            </button>
        </div>
    )
}
