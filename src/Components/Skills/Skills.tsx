import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, type ReactElement } from "react";
import SkillCard from "./SkillCard"


const Skills: React.FC = () =>{
    const { t, i18n } = useTranslation();
    const [Skill, setSkill] = useState<ReactElement[]|null>(null)
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const container = scrollRef.current;
    if (!container) return; 
    if (container.children.length === 0) return;

    const firstChild = container.children[0] as HTMLElement;
    const step = (firstChild.getBoundingClientRect().width + 16) * 2;
    let scrol = 0;

    const interval = setInterval(() => {
        scrol += step;

        if (scrol > container.scrollWidth - container.clientWidth) {
        scrol = 0;
        }

        container.scrollTo({
        left: scrol,
        behavior: "smooth",
        });
    }, 10000);

    return () => clearInterval(interval);
    }, [Skill]);


    useEffect(()=>{
        type DataFromApi = {Name:string, Description: string, Src: string}
        //const token = "4gak2mRFn8PuSzSHePD7OGBEczqXBZ8r";

        const parseSkil = (Skills : DataFromApi[]) : ReactElement[] => {
            return Skills.map((skil, index) => <SkillCard key={skil.Name} {...skil}/>)
        }
        
        fetch("/apiv2/skills/list",{
            method: "GET",
            headers: {
                //"Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(!response.ok)
            {
                throw new Error('Błąd sieci: ' + response.status);
            }
            else return response.json();
        })
        .then(data => {
            const simpledata: DataFromApi[] = data.map((skil: any) => ({
                Name: skil[`Name_${i18n.language}`], 
                Description: skil[`Description_${i18n.language}`],
                Src: skil.Src
            }))

            setSkill(parseSkil(simpledata))
        })
        .catch(error => {
            console.log(error)
        })
    }, [i18n.language])




    return (
        <div className="w-full sm:w-3/4 max-w-4xl h-full flex flex-col justify-center bg-gray-800 p-6 rounded-lg">
            <h1 className="text-4xl sm:text-6xl my-2 font-bold text-red-400 mb-4 text-left underline underline-offset-8">
                {t('skills.title')}
            </h1>
            <div ref={scrollRef} className="flex gap-2 overflow-hidden overflow-x-scroll h-auto py-4">
            {Skill}
            </div>
            
        </div>
    );
};

export default Skills;