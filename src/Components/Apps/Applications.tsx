import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState, type ReactElement } from "react";
import { useUser } from "../../Context/UserContext";
import {t} from "i18next";

const Apps: React.FC = () =>{
    const { t } = useTranslation();
    const [apps, setApps] = useState<(ReactElement | string)[] | null>(null);
    type DataFromApi = {Name:string, Link: string, Description: string, Secure: boolean, Role?: string, External: boolean, Zdj_name: string};

    const {user} = useUser();

    const [openedApp, setOpenedApp] = useState<DataFromApi | null>(null);

    const parseApps = (links: DataFromApi[]): (ReactElement | string)[] => {
      return links.map((app) => {return (app.Role === user?.role) || user?.role == "admin" || app.Role == "global" ? (
            <div onClick={() => setOpenedApp({Name: app.Name, Link: app.Link, Description: app.Description, Secure: app.Secure, External: app.External, Zdj_name: app.Zdj_name})} key={app.Name} className="cursor-pointer bg-[#212236] p-4 hover:scale-105 transition-transform duration-300 rounded-2xl shadow shadow-gray-700 hover:shadow-lg hover:bg-slate-700 ">
                <img src={`/images/png/${app.Zdj_name}.png`} alt={app.Name} className="w-auto  mx-auto mb-2" />
                <div className="flex justify-center gap-2"><h3 className="text-center text-white font-semibold text-2xl">{app.Name}</h3>{app.Secure ? <img src="/svg/shield.svg" alt="secure" onMouseOver={showInfo} onMouseLeave={showInfoHide}/> : null}</div>
                <p className="text-left text-gray-400 text-sm mt-1 h-15 overflow-hidden">{app.Description}</p>
                <div className="text-center text-gray-400 text-sm mt-1">
                <span className="inline-block animate-bounce text-blue-400">↓</span> {t('apps.seeMore')}
                </div>
            </div>
      ) : ""});
    };

    useEffect(() => {
      fetch('/apiv2/apps/list',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Błąd sieci: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        const simplified: DataFromApi[] = data.map((item: any) => ({
          Secure: item.Secure,
          Name: item[`Name_${i18n.language}`],
          Link: item.Link,
          Role: item.Role,
          External: item.External,
          Zdj_name: item.Zdj_name,
          Description: item[`Description_${i18n.language.toUpperCase()}`]
        }));
        setApps(parseApps(simplified));
      })
      .catch(error => {
        console.error('Coś poszło nie tak:', error);
      });
    }, [i18n.language, user]);

    const showInfo = (e: React.MouseEvent<HTMLImageElement>) => {
      const element = document.createElement("div");
      element.id = "auth-tooltip";
      element.className = "absolute z-50 bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg mt-2 w-auto h-auto";
      element.innerText = t('apps.secureInfo');

      document.body.appendChild(element);

      const targetRect = e.currentTarget.getBoundingClientRect();
      const tooltipWidth = element.offsetWidth;

      element.style.top = `${targetRect.top + window.scrollY - element.offsetHeight - 10}px`; 
      element.style.left = `${targetRect.left + window.scrollX + (targetRect.width / 2) - (tooltipWidth / 2)}px`;

    }

    const showInfoHide = (e: React.MouseEvent<HTMLImageElement>) => {
      const existingTooltip = document.getElementById("auth-tooltip");
      if (existingTooltip) {
        existingTooltip.remove();
      }
    }

    return (
        <div className="w-full sm:w-3/4 max-w-4xl h-full flex flex-col justify-center bg-gray-800 p-6 rounded-lg ">
            <h1 className="text-4xl sm:text-6xl my-2 font-bold text-red-400 mb-4 text-left underline underline-offset-8">
                {t('apps.title')}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 h-full overflow-y-auto sm:overflow-visible sm:h-auto">
            {apps}
            </div>
            {openedApp !== null && (
              <div onClick={() => setOpenedApp(null)} className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-30">
                <div onClick={(e) => e.stopPropagation()} className="bg-slate-800 p-4 transition-transform duration-300 rounded-2xl shadow w-11/12 sm:w-2/6 sm:h-auto">
                  <img src={`/images/png/${openedApp.Zdj_name}.png`} alt={openedApp.Zdj_name} className="w-auto sm:w-3/4 mx-auto mb-2" />
                  <div className="flex justify-center gap-2"><h3 className="text-center text-white font-semibold md:text-2xl">{openedApp.Name}</h3>{openedApp.Secure ? <img src="/svg/shield.svg" alt="secure" onMouseOver={showInfo} onMouseLeave={showInfoHide}/> : null}</div>
                  <p className="text-center text-gray-400 mt-1 md:text-lg w-full">{openedApp.Description}</p>
                  <div className="w-auto flex justify-center items-center">
                    {openedApp.Secure == true ? 
                      (user ? <Link className="text-white bg-red-400 hover:bg-red-500 rounded-md m-2 w-50 p-2 my-3 text-center" to={`/${openedApp.Link}`}>{t('apps.viewApp')}</Link> 
                      : 
                      <p className="text-white bg-red-400 rounded-md m-2 w-50 p-2 my-3 text-center">{t('apps.loginRequired')}</p>)
                    : (openedApp.External ? <a href={openedApp.Link} target="_blank" rel="noopener noreferrer" className="text-white bg-red-400 hover:bg-red-500 rounded-md m-2 w-50 p-2 my-3 text-center">{t('apps.viewApp')}</a> :<Link className="text-white bg-red-400 hover:bg-red-500 rounded-md m-2 w-50 p-2 my-3 text-center" to={`/${openedApp.Link}`}>{t('apps.viewApp')}</Link>) }
                  </div>
                </div>
                <div className="bg-slate-800 hover:bg-slate-700 p-4  transition-transform duration-300 rounded-2xl shadow my-2 text-red-400 font-bold cursor-pointer text-[18px]">
                        Zamknij
                    </div>
              </div>
            )}
        </div>
    );
};

export default Apps;