import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useUser } from "../../Context/UserContext";

const MobileMenu = ({ setShowLogin }: { setShowLogin: (show: boolean) => void; }) => {
    const { t } = useTranslation();
    const [showAccount, setShowAccount] = useState<boolean>(false);
    const [showLanguage, setShowLanguage] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { user, logout } = useUser();

    const navigate = useNavigate();

    const menuRef = useRef<HTMLDivElement>(null);
    const languageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
        ) {
            setShowMenu(false);
            setShowLanguage(false);
            setShowAccount(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (<div ref={menuRef} className="flex items-center justify-center md:hidden relative">
            <Link className="h-8 w-8 mr-2 flex justify-center items-center" to="/">
            <img src="/svg/house.svg" alt={t('header.home')} />
            </Link>
            <button
            onClick={() => {
                setShowMenu(!showMenu);
                setShowLanguage(false);
                setShowAccount(false);
            }}
            className="h-8 w-8 mr-2 flex justify-center items-center"
            >
            <img src="/svg/menu.svg" alt="Menu" />
            </button>

            {/* MENU TREŚĆ */}
            <div
            className={`fixed z-30 top-14 right-0 mt-2 w-48 bg-[#212236] rounded text-center p-2 origin-top transition-all duration-300 ease-in-out
                ${showMenu ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"}`}
            >
            {/* Konto */}
            <div className="relative">
                {user ? (
                <>
                    <button
                    className="cursor-pointer w-full p-2 flex justify-center gap-2"
                    onClick={() => {
                        setShowAccount(!showAccount);
                        setShowLanguage(false);
                    }}
                    >
                    {user?.login} <img src="/svg/circle-user-round.svg" />
                    </button>
                    <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        showAccount ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    >
                    <p className="p-1 m-1  text-center rounded-md cursor-pointer" onClick={() => {setShowAccount(false); setShowMenu(false); navigate("/account");}}>{t('header.account')}</p>

                    <button
                        className="bg-red-400 hover:bg-red-500 text-white p-2 w-full rounded-md mt-2"
                        onClick={() => {
                        logout();
                        setShowAccount(false);
                        setShowMenu(false);
                        }}
                    >
                        {t('header.logout')}
                    </button>
                    </div>
                </>
                ) : (
                <button
                    className="cursor-pointer w-full p-2 flex justify-center gap-2"
                    onClick={() => {
                    setShowLogin(true);
                    setShowMenu(false);
                    }}
                >
                    {t('header.login')} <img src="/svg/key-round.svg" />
                </button>
                )}
            </div>

            {/* Kontakt */}
            <Link
                to="/contact"
                className="p-2 flex justify-center gap-2"
                onClick={() => setShowMenu(false)}
            >
                {t('header.contact')} <img src="/svg/mail.svg" />
            </Link>

            {/* Język */}
            <div ref={languageRef} className="relative">
                <button
                onClick={() => {
                    setShowLanguage(!showLanguage);
                    setShowAccount(false);
                }}
                className="p-2 w-full cursor-pointer flex justify-center gap-2"
                >
                {t('header.language')} <img src="/svg/globe.svg" alt={t('header.language')} />
                </button>
                <div
                className={`mt-1 p-2 rounded flex flex-col w-full transition-all origin-top duration-300 ease-in-out overflow-hidden
                    ${showLanguage ? "opacity-100 max-h-30" : "opacity-0 max-h-0"}`}
                >
                <button
                    className="cursor-pointer px-4 py-1 m-1 bg-red-400 hover:bg-red-500 rounded-md"
                    onClick={() => {
                    i18n.changeLanguage("pl");
                    localStorage.setItem("language", "pl");
                    setShowLanguage(false);
                    setShowMenu(false);
                    }}
                >
                    {t('header.pl')}
                </button>
                <button
                    className="cursor-pointer px-4 py-1 m-1 bg-red-400 hover:bg-red-500 rounded-md"
                    onClick={() => {
                    i18n.changeLanguage("en");
                    localStorage.setItem("language", "en");
                    setShowLanguage(false);
                    setShowMenu(false);
                    }}
                >
                    {t('header.en')}
                </button>
                </div>
            </div>
            </div>
        </div>)
}

export default MobileMenu;