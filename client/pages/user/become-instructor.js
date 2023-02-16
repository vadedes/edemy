import { useContext, useState } from "react";
import axios from "axios";
import {Context} from '@/context'
import { Button } from "antd";
import { SettingOutlined, UserSwitchOutlined, LoadingOutlined } from "@ant-design/icons";
import {toast} from 'react-toastify'
import UserRoute from "@/components/routes/UserRoute";

const BecomeInstructor = () => {
//state
const [loading, setLoading] = useState(false);
const {state: {user}} = useContext(Context)

  const becomeInstructor = () => {
    setLoading(true);
    axios.post('/api/make-instructor')
    .then(res => {
      console.log(res);
      window.location.href = res.data;
    })
    .catch(err => {
      console.log(err.response.status);
      toast('Stripe onboarding failed. Try again.')
      setLoading(false)
    })
  }


  return (
    <>
      <div className="container mx-auto py-10 flex flex-col justify-center items-center w-96">
      <h1 className="text-5xl text-bold text-center mx-auto mb-10 w-full">Become an Instructor</h1>
        <div className="container mx-auto">
          <div className="flex flex-col">
            <div className="pt-4 flex flex-col justify-center items-center">
                <UserSwitchOutlined className="pb-3 mx-auto text-4xl"/>
                <br/>
                <h2 className="text-2xl text-center mb-5">
                  Setup payout to publish courses on Edemy
                </h2>
                <p className="text-md text-yellow-500 text-center mb-5">
                  Edemy partners with stripe to transfer earnings to your bank account.
                </p>

                <Button 
                  className="mt-3 mb-3 rounded-full text-slate-800 bg-slate-200 h-[40px]" 
                  icon={loading ? <LoadingOutlined/> : <SettingOutlined/> } onClick={becomeInstructor}
                  block
                  type="primary"
                  disabled={user && user.role && user.role.includes('Instructor') || loading}
                  >
                    {loading ? "Processing..." : "Payout Setup"}
                </Button>

                <p className="text-center">You will be redirected to stripe to complete your onboarding process.</p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default BecomeInstructor;