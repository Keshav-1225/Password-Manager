import React from 'react'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
  const [form, setform] = useState({ uuid:"", site: "", username: "", password: ""});
  const [passwordArray, setPasswordArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")

    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const savePassword = (e) => {
    e.preventDefault()
    if(isEditing)
    {
      const updatedArray = passwordArray.map(item=>
        item.uuid === form.uuid ? form : item
      )
      setPasswordArray(updatedArray)
      localStorage.setItem("passwords", JSON.stringify(updatedArray))
      setIsEditing(false)
      setform({ uuid: "", site: "", username: "", password: "" });  // Reset form
    }else{

      const newArray = [...passwordArray, {...form, uuid:uuidv4()}]
      setPasswordArray(newArray)
      localStorage.setItem("passwords", JSON.stringify(newArray))
      console.log(localStorage.getItem("passwords"))
    }
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

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

    console.log(text)
    navigator.clipboard.writeText(text)
  }

  const handleEdit = (e)=>{
    let data = passwordArray.filter(item => item.uuid === e)
    setform(data[0])
    setIsEditing(true)
    
  }
  const handleDelete = (e)=>{
    console.log('delete Initiated: '+e)
    setPasswordArray(passwordArray.filter(item=>item.uuid != e))
    localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.uuid != e)))

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

          <button
            type="submit" onClick={savePassword}
            className='w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl'
          >
            Save Password
          </button>
        </form>
      </div>
      <div className='w-[50vw] bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
        <div className='text-2xl font-bold'>Saved Passwords</div>
        {passwordArray.length === 0 && <div>NO passwords to show</div>}
        {passwordArray.length != 0 &&
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
              {passwordArray.map((items, index) => (
                <tr key={index}>
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
                      <span data-tooltip-id='edit-btn' data-tooltip-content={'Edit'} className='hover:cursor-pointer' onClick={()=>handleEdit(items.uuid)}>
                      <lord-icon src="https://cdn.lordicon.com/fikcyfpp.json" trigger="hover" style={{ width: '25px', height: '25px' }}>
                      </lord-icon>
                      </span>
                      <span data-tooltip-id='delete-btn' data-tooltip-content={'Delete'} onClick={()=>handleDelete(items.uuid)} className='hover:cursor-pointer'>
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
        <Tooltip id='edit-btn'/>
        <Tooltip id='delete-btn' />

      </div>
    </div>
  )
}

export default Manager
