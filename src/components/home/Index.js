import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Index.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner'



const Home = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllData = async () => {
        setLoading(true)
        await axios.get('http://localhost:8000/api/getall').then((res) => {
            setData(res.data)
            setLoading(false)
        }).
            catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        getAllData()
    }, [])

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/delete/${id}`).then((item) => {
            console.log(item)
            toast.success('data deleted successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            getAllData()
        })
    }
    return (
        <>
            <div className='usertable'>
                <Link to={'/add'} className='addbtn'>Add User</Link>
                {loading ? 
                <div className='loader'>
                (<Circles
                    height="40"
                    width="40"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />)
                </div>
                 : (<table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.fname}</td>
                                    <td>{item.email}</td>
                                    <td className='actionButton'>
                                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                                        <Link to={`/edit/${item._id}`}>Edit</Link>
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>)}

            </div>
        </>
    )
}
export default Home