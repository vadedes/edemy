import { useState } from 'react';
import Link from 'next/link';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ email, password });
  };

  return (
    <div className="container mx-auto py-10 flex flex-col justify-center items-center w-96">
      <h1 className="text-5xl text-bold text-center mx-auto mb-10">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">
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
        >
          Submit
        </button>
      </form>

      <p className="text-center p-3">
        No account yet?{' '}
        <Link href="/register" className="text-bold text-blue-500 cursor-pointer">
          Register
        </Link>
      </p>
    </div>
  );
}
