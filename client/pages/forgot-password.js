import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '@/context';
import { useRouter } from 'next/router';


const ForgotPassword = () => {
  //state
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  //context
  const {state: {user}} = useContext(Context);

  //router
  const router = useRouter()

  //redirect if user is logged in
  //we add the user in dependency array so that when they are
  //logged in, they will not be able to access the forgot password route
  useEffect(() => {
    if(user) router.push('/');
  }, [user])
  
  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const {data} = await axios.post('/api/forgot-password', {email});
      setSuccess(true);
      toast("Check your email for the secret code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log(email, code, newPassword)
    // return
    try {
      setLoading(true)
      const {data} = await axios.post('/api/reset-password', {
        email,
        code,
        newPassword
      })
      setEmail('');
      setCode('');
      setNewPassword('');
      setLoading(false)
      toast('Great! Now you can login with your new password.');
    } catch (err) {
      setLoading(false);
      toast(err.response.data)
    }
  }

  return (
    <>
    <div className="container mx-auto py-10 flex flex-col justify-center items-center w-96">
      <h1 className="text-5xl text-bold text-center mx-auto mb-4">Forgot Password</h1>
    </div>

    <div className='container mx-auto py-0 flex flex-col justify-center items-center w-96'>
      <form onSubmit={success ? handleResetPassword : handleSubmit} className="flex flex-col justify-center items-center w-full">
        <input 
          type="email" 
          className='className="mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full' 
          value={email} 
          onChange={(e)=> setEmail(e.target.value)}
          placeholder='Enter email'
          required
          />
        {success && <>
          <input 
          type="text" 
          className='className="mb-4 p-4 my-4 border-solid border-2 border-slate-300 rounded-md w-full' 
          value={code} 
          onChange={(e)=> setCode(e.target.value)}
          placeholder='Enter secret code'
          required
          />

          <input 
          type="password" 
          className='className="mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full' 
          value={newPassword} 
          onChange={(e)=> setNewPassword(e.target.value)}
          placeholder='Enter new password'
          required
          />
        </>}
        <br />
        <button
          type='submit'
          className="px-6 py-4 mt-4 w-full bg-slate-500 text-white rounded-md hover:bg-slate-400 transition ease-in-out duration-300"
          disabled={!email || loading}
        >
          {loading ? <SyncOutlined spin /> : 'Submit'}
        </button>
      </form>
    </div>
    </>
  )
}

export default ForgotPassword;