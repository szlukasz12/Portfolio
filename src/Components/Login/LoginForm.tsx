import { useContext, useState } from "react"
import { useUser } from "../../Context/UserContext"
import { useTranslation } from 'react-i18next';

type LoginProps ={
    setShowLogin: (bool: boolean) => void
}

const LoginForm = (props : LoginProps) => {
    const { login } = useUser();
    const { t } = useTranslation();
    const [passwordU, setPasswordUser] = useState<string>("")
    const [loginU, setLoginUser] = useState<string>("")
    const [tip, setTip] = useState("");

    const [loading, setLoading] = useState(false);

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        const response = await login({Login: loginU, Password: passwordU})
        if (typeof response === 'number') {
            setTip(`${response == 0 ? t('login.failed_attempts_end') : t('login.failed_attempts') + response}`);
            setTimeout(() => {
                setTip("");
            }, 3000);
        }
        else if(response == true)
        {
            props.setShowLogin(false)
        }
        else if (response == false){
            setTip(t('login.failed'));
            setTimeout(() => {
                setTip("");
            }, 3000);
        }
        setLoading(false);
    }


    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
        <div className="absolute z-50 top-1/2 left-1/2 -translate-1/2 bg-[#23263A] h-auto w-auto border-2 border-gray-600 p-4 shadow-lg rounded-2xl">
                <div className="flex justify-center items-center w-full"><img src="/favico.png" className="w-20 h-20"></img></div>
                <form onSubmit={loginUser} className="flex flex-col justify-center items-center m-3">
                    <input className="p-2 m-2 bg-gray-700" id="login" type="login" onChange={(e) => setLoginUser(e.target.value)} placeholder="Login"></input>
                    <input className="p-2 m-2 bg-gray-700" id="password" type="password" onChange={(e) => setPasswordUser(e.target.value)} placeholder="Password"></input>
                    <div className="grid grid-cols-2 gap-1 sm:gap-2">
                        <button onClick={()=> props.setShowLogin(false)} className="bg-red-400 py-2 px-3 sm:px-6 m-2 cursor-pointer" type="button">{t('login.cancel')}</button>
                        <button className="bg-red-400 py-2 px-3 sm:px-6 m-2 cursor-pointer" type="submit">{loading ? t('login.loading') : t('login.submit')}</button>
                    </div>
                    <p>{t('login.testNote')}</p>
                    <p className="text-2xl">{t('login.testUser')}</p>
                    <p className="text-2xl">{t('login.testPassword')}</p>
                </form>
        </div>
        {tip && (
        <div className="fixed right-4 top-4 bg-red-500 text-white text-sm text-center rounded px-3 py-2 shadow-md animate-fade-in">
          {tip}
        </div>
      )}
    </div>
    )
}

export default LoginForm;