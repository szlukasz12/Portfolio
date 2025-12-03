import { useTranslation } from 'react-i18next';
import { useUser } from '../../Context/UserContext';
import { useState } from 'react';
import i18n from "i18next";

const AccountSettings = () => {

    const { t } = useTranslation();
    const { user, refreshuser, logout } = useUser();

    const [language, setLanguage] = useState<string>(user?.lang || 'pl');

    const [changing, setChanging] = useState<boolean>(false)
    const [changed, setChanged] = useState<boolean>(false);

    const saveChanges = async () => {
        setChanging(true);
        const respons = await fetch(`/apiv2/user/setLang`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${user?.token}`
            },
            body: JSON.stringify({Lang: language})
        })

        if(respons.status === 401){
            logout();
            return;
        }

        if(!respons.ok)
        {
            setChanged(false);
        }

        const data = await respons.json();

        if(data > 0)
        {
            const userReady = await refreshuser()
            if(userReady)
            {
                i18n.changeLanguage(language);
                localStorage.setItem("language", language);
                setChanged(false);
            }
        }
        else{
            setChanged(false);
        }
    };

    return (
    <div className="relative flex flex-col mt-1 w-full p-3 h-full">
        <div>
            <label htmlFor='language' className="mt-5 mb-2 text-gray-400">{t('Account.language')}</label>
            <select value={language} id="language" className='w-fit rounded-md px-2 py-1 bg-[#212236] text-xl transition-all duration-100 hover:bg-[#2c2e4a] focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={async (e)=>{setChanged(true); setLanguage(e.target.value)}}>
                <option value="en">{t('English')}</option>
                <option value="pl">{t('Polski')}</option>
            </select>
        </div>

        {changed && (
            <button className="mt-5 w-fit px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors duration-200" onClick={saveChanges}>
                {changing ? t("Account.Saving") : t('Account.SaveChanges')}
            </button>
        )}

        <p className='absolute left-0 bottom-5'>{t(`MoreInDevelopment`)}</p>
    </div>);
};

export default AccountSettings;