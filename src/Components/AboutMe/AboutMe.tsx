import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AboutMe: React.FC = () => {
    const { t } = useTranslation();

  return (
    <div className="sm:w-3/4 max-w-4xl h-auto flex flex-col justify-center bg-gray-800 p-6 rounded-lg">
      <h1 className="text-4xl sm:text-6xl text-red-400 mb-4 text-left underline underline-offset-8 font-bold">
        {t('about.greeting')}
      </h1>
      <p className="text-gray-300 text-left leading-relaxed py-5 sm:py-10">
       {t("AboutMe")}
       </p>
      {/*<Link to="/AboutMe" className="text-white bg-red-500 w-50 p-2 my-3 text-center">O mnie</Link>*/}
    </div>
  );
};

export default AboutMe;
