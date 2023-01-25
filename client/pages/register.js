import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';

export default function register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({name, email, password})

    //handle submission
    //second arg in request was the data to be sent
    try {
      setLoading(true);
      const { data } = await axios.post(`http://localhost:3333/api/register`, {
        name,
        email,
        password,
      });
      // console.log('REGISTER RESPONSE', data);
      toast.success('Registration successfull. Please login.');
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }

    //reset form inputs
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container mx-auto py-10 flex flex-col justify-center items-center w-96">
      <h1 className="text-5xl text-bold text-center mx-auto mb-10">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">
        <input
          type="text"
          className="mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          className="mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="mb-4 p-4 border-solid border-2 border-slate-300 rounded-md w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />
        <button
          type="submit"
          className="px-6 py-4 w-full bg-slate-500 text-white rounded-md hover:bg-slate-400 transition ease-in-out duration-300"
          disabled={!name || !email || !password || loading}
        >
          {loading ? <SyncOutlined spin /> : 'Submit'}
        </button>
      </form>
    </div>
  );
}
