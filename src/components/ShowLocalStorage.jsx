import React from 'react'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip';
import { toast, Bounce } from 'react-toastify';
import { getData } from '../services/api';


const ShowLocalStorage = ({ passwordArray, setPasswordArray, setform, setIsEditing }) => {
    const [activeView, setActiveView] = useState("local");
    const [serverPasswords, setServerPasswords] = useState([]);
    const [isLoadingServer, setIsLoadingServer] = useState(false);
    const [serverError, setServerError] = useState("");
    const passwordsToShow = activeView === "local" ? passwordArray : serverPasswords;

    useEffect(() => {
        if (activeView !== "server") {
            return;
        }

        const fetchServerPasswords = async () => {
            setIsLoadingServer(true);
            setServerError("");

            try {
                const data = await getData();
                setServerPasswords(data);
            } catch {
                setServerError("Could not load server passwords");
                toast.error('Could not load server passwords', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } finally {
                setIsLoadingServer(false);
            }
        }

        fetchServerPasswords();
    }, [activeView])

    const handleCopy = (text) => {
        toast.success('Successfully copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

        navigator.clipboard.writeText(text)
    }

    const handleEdit = (id) => {
        if (activeView === "server") {
            toast.info('Server password editing is not connected yet', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        let data = passwordArray.find(item => item._id === id)
        setform(data)
        setIsEditing(true)
    }

    const handleDelete = (id) => {
        if (activeView === "server") {
            toast.info('Server password deleting is not connected yet', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        const updatedArray = passwordArray.filter(item => item._id !== id)
        setPasswordArray(updatedArray)
        localStorage.setItem("passwords", JSON.stringify(updatedArray))
    }

    return (
        <div className='w-[50vw] bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
            <div className='flex items-center justify-between gap-4 mb-4'>
                <div className='text-2xl font-bold'>Saved Passwords</div>
                <div className='flex rounded-full bg-gray-100 p-1 text-sm font-semibold'>
                    <button
                        type='button'
                        onClick={() => setActiveView("local")}
                        className={`rounded-full px-4 py-2 transition-all ${activeView === "local" ? "bg-blue-700 text-white shadow" : "text-gray-600 hover:text-blue-700"}`}
                    >
                        Local
                    </button>
                    <button
                        type='button'
                        onClick={() => setActiveView("server")}
                        className={`rounded-full px-4 py-2 transition-all ${activeView === "server" ? "bg-green-700 text-white shadow" : "text-gray-600 hover:text-green-700"}`}
                    >
                        Server
                    </button>
                </div>
            </div>
            {isLoadingServer && <div>Loading server passwords...</div>}
            {serverError && activeView === "server" && <div className='text-red-600'>{serverError}</div>}
            {!isLoadingServer && passwordsToShow.length === 0 && <div>NO passwords to show</div>}
            {!isLoadingServer && passwordsToShow.length != 0 &&
                <table className="table-auto w-full">
                    <thead className='bg-blue-800 text-white'>
                        <tr>
                            <th>Website</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwordsToShow.map((items) => (
                            <tr key={items._id}>
                                <td className=''>
                                    <div className='flex justify-between'>{items.site}
                                        <span data-tooltip-id='copy-site' data-tooltip-content={'Copy'} onClick={() => handleCopy(items.site)}>
                                            <img src="/copy.png" width="20px" className='mr-4 hover:cursor-pointer' />
                                        </span>
                                    </div>
                                </td>

                                <td className=''><div className='flex justify-between'>
                                    {items.username}
                                    <span data-tooltip-id='copy-username' data-tooltip-content={'Copy'} onClick={() => handleCopy(items.username)}>
                                        <img src="/copy.png" width="20px" className='mr-4 hover:cursor-pointer' />
                                    </span>
                                </div>
                                </td>
                                <td className=''><div className='flex justify-between'>
                                    {items.password}
                                    <span data-tooltip-id='copy-password' data-tooltip-content={'Copy'} onClick={() => handleCopy(items.password)}>
                                        <img src="/copy.png" width="20px" className='mr-4 hover:cursor-pointer' /></span>
                                </div>
                                </td>
                                <td className='text-center'>
                                    <div className='flex justify-center space-x-4'>
                                        <span data-tooltip-id='edit-btn' data-tooltip-content={'Edit'} className='hover:cursor-pointer' onClick={() => handleEdit(items._id)}>
                                            <lord-icon src="https://cdn.lordicon.com/fikcyfpp.json" trigger="hover" style={{ width: '25px', height: '25px' }}>
                                            </lord-icon>
                                        </span>
                                        <span data-tooltip-id='delete-btn' data-tooltip-content={'Delete'} onClick={() => handleDelete(items._id)} className='hover:cursor-pointer'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/sxhqklqh.json"
                                                trigger="hover"
                                                colors="primary:#e4e4e4,secondary:#000000,tertiary:#646e78"
                                                style={{ width: "25px", height: "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <Tooltip id="copy-site" />
            <Tooltip id='copy-username' />
            <Tooltip id='copy-password' />
            <Tooltip id='edit-btn' />
            <Tooltip id='delete-btn' />

        </div>
    )
}

export default ShowLocalStorage
