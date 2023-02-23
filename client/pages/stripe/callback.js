import {useContext, useEffect} from 'react';
import {Context} from '../../context'
import { SyncOutlined } from '@ant-design/icons';

import axios from 'axios';

const StripeCallback = () => {
  //first access user from the state
  const {state: {user}} = useContext(Context);

  useEffect(()=> {
    if(user) {
      axios.post("/api/get-account-status").then((res)=>{
        console.log(res)
        // window.location.href = '/instructor'
      })
    }
  }, [user])

  return (
    <SyncOutlined spin className='flex justify-center text-5xl p5 mt-10'/>
  )
}

export default StripeCallback