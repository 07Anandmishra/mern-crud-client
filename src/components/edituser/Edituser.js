import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../adduser/Adduser.css'
import axios from 'axios'
import { toast } from 'react-toastify';


const Home = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    })

    const getuserData = async (id) => {
        await axios.get(`http://localhost:8000/api/getone/${id}`).then((res) => {
            setData(res.data)
        })
    }
    useEffect(() => {
        getuserData(id)
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data, [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(e)
        await axios.put(`http://localhost:8000/api/update/${id}`,data).then((item)=>{
            console.log(item)
            toast.success('User Updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(()=>{
               navigate('/')
            },[3000])
        })
    }

    return (
        <>
            <div className='addUser'>
                <Link to={'/'}>Back</Link>
                <h3>Update User</h3>
                <form className='adduserForm'>
                    <div className='inputGroup'>
                        <label htmlFor='fname'>First Name</label>
                        <input type='text' value={data.fname} onChange={handleChange} id='fname' name='fname' autoComplete='off' placeholder='Enter First Name' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='lname'>Last Name</label>
                        <input type='text' value={data.lname} onChange={handleChange} id='lname' name='lname' autoComplete='off' placeholder='Enter Last Name' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' value={data.email} onChange={handleChange} id='email' name='email' autoComplete='off' placeholder='Enter Email' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='text' value={data.password} onChange={handleChange} id='password' name='password' autoComplete='off' placeholder='Enter Password' />
                    </div>
                    <div className='inputGroup'>
                        <button type='submit' onClick={handleSubmit}>Update User</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Home