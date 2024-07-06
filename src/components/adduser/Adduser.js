import React, { useState } from 'react'
import './Adduser.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const Home = () => {

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleChangeValue = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormData({
            ...formData, [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await axios.post('http://localhost:8000/api/create', formData)
            console.log(res.data)
            toast.success('User added successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                navigate('/')
            }, 4000)
        } catch (err) {
            console.log(err)
            toast.error('Error adding user. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className='addUser'>
                <Link to={'/'}>Back</Link>
                <h3>Add New User</h3>
                <form className='adduserForm' >
                    <div className='inputGroup'>
                        <label htmlFor='fname'>First Name</label>
                        <input type='text' value={formData.fname} onChange={handleChangeValue} id='fname' name='fname' autoComplete='off' placeholder='Enter First Name' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='lname'>Last Name</label>
                        <input type='text' value={formData.lname} onChange={handleChangeValue} id='lname' name='lname' autoComplete='off' placeholder='Enter Last Name' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' value={formData.email} onChange={handleChangeValue} id='email' name='email' autoComplete='off' placeholder='Enter Email' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='text' value={formData.password} onChange={handleChangeValue} id='password' name='password' autoComplete='off' placeholder='Enter Password' />
                    </div>
                    <div className='inputGroup'>
                        <button type='submit' onClick={handleSubmit}>{isLoading ? 'Adding User...' : 'Add User'}</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Home