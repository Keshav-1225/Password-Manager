import React from 'react'
import { useState } from 'react'
import { ToastContainer, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import ShowLocalStorage from './ShowLocalStorage';
import { postData } from '../services/api';

const Manager = () => {
  const [form, setform] = useState({ _id: "", site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState(() => {
    const passwords = localStorage.getItem("passwords")
    return passwords ? JSON.parse(passwords) : []
  });
  const [isEditing, setIsEditing] = useState(false);

  

  const savePasswordToServer = async(e)=>{
    e.preventDefault()
    let serverData = {
      site: form.site,
      username: form.username,
      password: form.password
    }
    let data = await postData(serverData)
    console.log(data)
  }

  const savePassword = (e) => {
    e.preventDefault()

    if (isEditing) {
      const updatedArray = passwordArray.map(item =>
        item._id === form._id ? form : item
      )
      setPasswordArray(updatedArray)
      localStorage.setItem("passwords", JSON.stringify(updatedArray))
      setIsEditing(false)
      setform({ _id: "", site: "", username: "", password: "" });
    } else {
      const newArray = [...passwordArray, { ...form, _id: uuidv4() }]
      setPasswordArray(newArray)
      localStorage.setItem("passwords", JSON.stringify(newArray))
      setform({ _id: "", site: "", username: "", password: "" });
    }
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className='w-full flex justify-around min-h-[90vh] items-center bg-linear-to-br from-blue-50 to-indigo-100 p-4'>

      <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        draggable
        theme="light"
        transition={Bounce} />

      <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
        <div className="logo text-4xl font-bold text-gray-800 w-full text-center mb-8">
          <span className='text-black font-extrabold'>Pass</span><span className='text-indigo-600'>Guide</span>
        </div>

        <form className='space-y-6'>
          <div>
            <label htmlFor="website" className='block text-sm font-medium text-gray-700 mb-2'>
              Website URL
            </label>
            <input
              placeholder='https://example.com'
              value={form.site}
              onChange={handleChange}
              type="url"
              name="site"
              id="website"
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white'
            />
          </div>

          <div>
            <label htmlFor="username" className='block text-sm font-medium text-gray-700 mb-2'>
              Username
            </label>
            <input
              placeholder='Enter your username'
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white'
            />
          </div>

          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              placeholder='Enter your password'
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white'
            />
          </div>
          <div className='flex gap-3'>
            <button
              type="submit" onClick={savePassword}
              className=' bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-1 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              Save Password Locally
            </button>
            <button
              type='submit' onClick={savePasswordToServer} 
              className='bg-green-600 text-white font-semibold py-1 px-4 rounded-lg'>Save password on server</button>
          </div>
        </form>
      </div>
      {/* Show local storage */}
      <ShowLocalStorage
        passwordArray={passwordArray}
        setPasswordArray={setPasswordArray}
        setform={setform}
        setIsEditing={setIsEditing}
      />
    </div>
  )
}

export default Manager
