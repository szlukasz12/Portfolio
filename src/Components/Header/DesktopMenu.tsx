import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useUser } from "../../Context/UserContext";

const DesktopMenu = ({ setShowLogin }: { setShowLogin: (show: boolean) => void }) => {
    const { t } = useTranslation();
    const { user, logout } = useUser();
    const [showAccount, setShowAccount] = useState<boolean>(false);
    const [showLanguage, setShowLanguage] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const navigate = useNavigate();

    const accountRef = useRef<HTMLDivElement>(null);
    const languageRef = useRef<HTMLDivElement>(null);
    const accountRefButton = useRef<HTMLButtonElement>(null);


    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (accountRef.current && !accountRef.current.contains(event.target as Node) && languageRef.current &&
        !languageRef.current.contains(event.target as Node) && accountRefButton.current &&
        !accountRefButton.current.contains(event.target as Node)
        )
        {
            setShowAccount(false);
            setShowLanguage(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (<div className="hidden md:flex items-center space-x-4 relative">
      <Link className="flex justify-center gap-1" to="/">{t('header.home')}<img src="/svg/house.svg"  /></Link>
      <Link className="flex justify-center gap-1" to="/contact">{t('header.contact')} <img src="/svg/mail.svg" /></Link>

        {/* KONTO */}
        <div className="relative">
          {user ? (
            <button ref={accountRefButton}
              className="cursor-pointer"
              onClick={() => {
                setShowAccount(!showAccount);
                setShowLanguage(false);
              }}
            >
              <div className="flex justify-center gap-1">{user?.login} <img src="/svg/circle-user-round.svg" /></div>
            </button>
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => setShowLogin(true)}
            >
              <div className="flex justify-center gap-1">{t('header.login')} <img src="/svg/key-round.svg"/></div>
            </button>
          )}

          <div ref={accountRef}
            className={`absolute top-full right-0 mt-2 bg-[#212236] rounded p-2 z-30 flex flex-col transition-all duration-300 ease-in-out origin-top overflow-hidden
            ${showAccount ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"}`}
          >
            <p className="p-1 m-1 hover:bg-red-400 text-center rounded-md cursor-pointer" onClick={() => {setShowAccount(false);navigate("/account");}}>{t('header.account')}</p>
            <p
              className="p-1 m-1 bg-red-400 hover:bg-red-500 text-center rounded-md cursor-pointer"
              onClick={() => {
                logout();
                setShowAccount(false);
              }}
            >
              {t('header.logout')}
            </p>
          </div>
        </div>
        <div ref={languageRef} className="relative">
          <button
            className="cursor-pointer"
            onClick={() => {
              setShowLanguage(!showLanguage);
              setShowAccount(false);
            }}
          >
            <div className="flex justify-center gap-1">{t('header.language')} <img src="/svg/globe.svg" alt={t('header.language')} /></div>
          </button>

          <div
            className={`absolute top-full right-0 mt-2 bg-[#212236] rounded p-2 z-30 flex flex-col transition-all duration-300 ease-in-out origin-top overflow-hidden
            ${showLanguage ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"}`}
          >
            <button
              className="cursor-pointer px-4 py-1 m-1 bg-red-400 hover:bg-red-500 rounded-md"
              onClick={() => {i18n.changeLanguage("pl"); localStorage.setItem("language", "pl"); setShowLanguage(false); setShowMenu(false);}}
            >
              {t('header.pl')}
            </button>
            <button
              className="cursor-pointer px-4 py-1 m-1 bg-red-400 hover:bg-red-500 rounded-md"
              onClick={() => {i18n.changeLanguage("en"); localStorage.setItem("language", "en"); setShowLanguage(false); setShowMenu(false);}}
            >
              {t('header.en')}
            </button>
          </div>
        </div>
      </div>)
}
export default DesktopMenu;