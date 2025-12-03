import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useTranslation } from "react-i18next";
import AccountSettings from "./AccountSettings";
import AccountTab from "./AccountTab";
import { useNavigate } from "react-router-dom";

const menuItems = [{Name: "Account", src: "circle-user-round.svg"}, {Name: "Settings", src: "settings.svg"}];

const Account = () => {

    const { t } = useTranslation();

    const { user } = useUser();
    const [menu, setMenu] = useState("Account");
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) navigate("/");
    }, [user]);

    const generateMenu = (items: {Name: string, src: string}[]) => {return items.map((item) => (
        <div key={item.Name} onClick={()=>{setMenu(item.Name); setShowMenu(false)}} className={`flex justify-center gap-1 sm:gap-2 text-[15px] sm:text-[19px] w-full  p-1 py-2 hover:bg-[#1A2448] text-center cursor-pointer rounded-2xl ${menu == item.Name ? "text-red-400 bg-[#1A2448]" : "text-white "}`}>
            <img src={`/svg/${item.src}`}></img>
            <p className={`${showMenu ? "block opacity-100" : "hidden opacity-0"} sm:opacity-100 sm:block transition-all duration-300`}>{t(`Account.${item.Name}`)}</p>
        </div>
    ));}

    const date = new Date(user?.joined || "");

  return (<section className="flex items-center justify-center w-11/12 sm:w-3/4 max-w-5xl h-full text-white">
    <div className="relative bg-[#212236] h-3/4 w-full flex justify-center items-center rounded-2xl">
        <div className={`absolute bg-[#212236] left-0 top-0 sm:relative z-30 flex flex-col items-center gap-2 sm:w-2/7 h-full p-1 sm:p-2 transition-all rounded-2xl duration-300 ${showMenu ? "w-1/2" : "w-1/8"}`}>
            <div className="hidden sm:block text-3xl md:text-4xl lg:text-5xl text-white py-4">{t(`Account.Account`)}</div>
            <div className="sm:hidden text-3xl md:text-4xl lg:text-5xl text-white py-4" onClick={() => setShowMenu(!showMenu)}><img src="/svg/menu.svg"></img></div>
            {generateMenu(menuItems)}
        </div>
        <div className="flex flex-col items-start min-w-5/7 h-11/12 p-3 rounded-2xl bg-gray-800 m-3 sm:m-5">
            <div className="text-3xl flex justify-center items-center">
                <img src="/svg/circle-user-round.svg" alt="User Avatar" className="hidden sm:block rounded-full w-30 h-30"/>
                <div className="mx-2">
                    <div className="text-4xl">{user?.login}</div>
                    <div className="text-sm text-gray-400">{t(`Account.joined`)}: {String(date.toLocaleString())}</div>
                </div>
            </div>
            {menu == "Account" ? (<AccountTab />)
            : menu == "Settings" ? (<AccountSettings />)
            : null}
        </div>
    </div>
  </section>);
};

export default Account;