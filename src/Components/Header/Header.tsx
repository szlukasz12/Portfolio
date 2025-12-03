import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "../Login/LoginForm";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const { t } = useTranslation();

  return (
    <header className="h-16 w-full  flex justify-between items-center bg-[#212236] px-5 sm:px-[10%] text-white">
    <div className="flex justify-center items-center gap-2"><img src="/favico.png" className="w-16 h-16"></img><div className="font-bold text-2xl sm:text-3xl">{t('header.portfolio')}</div></div>
    
      {/* MENU MOBILE */}
      <MobileMenu
        setShowLogin={setShowLogin}
      />

      {/* MENU DESKTOP */}
      <DesktopMenu 
        setShowLogin={setShowLogin}
      />

      {showLogin ? <LoginForm setShowLogin={setShowLogin} /> : null}
    </header>
  );
};

export default Header;
