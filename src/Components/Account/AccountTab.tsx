import { useTranslation } from 'react-i18next';
import { useUser } from '../../Context/UserContext';

const AccountInfo = () => {

    const { t } = useTranslation();
    const { user } = useUser();

    return (
    <div className="flex flex-col mt-1 w-full p-3">
        <label htmlFor="name" className=" mt-5 mb-2 text-gray-400">{t(`Account.name`)}:</label>
        <div id="name" className="text-xl">{user?.name} {user?.lastname}</div>
        <label htmlFor="email" className=" mt-5 mb-2 text-gray-400">{t(`Account.email`)}:</label>
        <div id="email" className="text-xl">{user?.email}</div>
        <label htmlFor="adres" className=" mt-5 mb-2 text-gray-400">{t(`Account.address`)}:</label>
        <div id="adres" className="text-xl">{user?.adres}</div>
    </div>);
};

export default AccountInfo;