import { useState, type ReactElement } from "react"
import {t} from "i18next";
type Skill = {Name: string, Description: string, Src: string};

const SkillCard = (props: Skill) : ReactElement =>{
    const [skillShow, setSkillShow] = useState<boolean>(false);
    

    return (
        <>
            <div onClick={() => setSkillShow(!skillShow)} key={props.Name} className={`bg-[#212236] min-w-50 p-4 relative sm:hover:scale-105 transition-transform duration-300 rounded-2xl shadow shadow-gray-700 sm:hover:shadow-lg sm:hover:bg-slate-700 cursor-pointer h-full m-1`}>
                <img src={`/images/svg/${props.Src}`} alt={props.Name} className="w-13  mb-2" />
                <h3 className="text-left text-white font-semibold">{props.Name}</h3>
                <p className="text-left text-gray-400 mt-1 md:text-lg h-20 overflow-hidden">{props.Description}</p>
                <div className="text-left text-gray-400 text-sm mt-1">
                    <span className="inline-block animate-bounce text-blue-400">↓</span> {t('skillsCard.showmore')}
                </div>
            </div>
            {skillShow ? 
                <div onClick={() => setSkillShow(false)} className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
                    <div onClick={(e) => e.stopPropagation()} className={`bg-slate-800 p-4  transition-transform duration-300 rounded-2xl shadow w-2/3 h-auto sm:w-2/6 sm:h-auto lg:max-w-1/4`}>
                        <img src={`/images/svg/${props.Src}`} alt={props.Name} className="w-17 mx-auto mb-2" />
                        <h3 className="text-center text-white font-semibold md:text-2xl">{props.Name}</h3>
                        <p className="text-left text-gray-400 mt-1 md:text-lg w-full">{props.Description}</p>
                    </div>
                    <div className="bg-slate-800 hover:bg-slate-700 p-4  transition-transform duration-300 rounded-2xl shadow my-2 text-red-400 font-bold cursor-pointer text-[18px]">
                        Zamknij
                    </div>
                </div>
            : null}
        </>
    )
    
}

export default SkillCard;