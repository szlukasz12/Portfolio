import { useTranslation } from "react-i18next";
import { useState, type ReactElement } from "react";
import { removepeople } from "../Api/Person";
import { useUser } from "../../Context/UserContext";

type PersonInfoProps = {
  id: number;
  City: string;
  Tel: string;
  Name: string;
  refresh: () => void;
  setEditElement: (id: number | null) => void;
  editElement?: number | null;
};

const PersonInfo = ({
  id,
  City,
  Tel,
  Name,
  setEditElement,
  refresh,
  editElement,
}: PersonInfoProps): ReactElement => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = useUser();
  const [remove, setRemove] = useState<boolean>(false);

  return (
    <div className="bg-[#414877] rounded-xl p-5 flex flex-col shadow-md hover:shadow-lg transition-all duration-200 border border-[#52598e]/30">
      {/* Nagłówek */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-white">{Name}</h2>
        {user && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-1 text-sm text-blue-200 border border-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            {expanded ? t("hide") : t("show")}
          </button>
        )}
      </div>

      {/* Rozwinięcie */}
      {expanded && (
        <div className="text-white space-y-1 border-t border-[#5c64a3]/30 pt-3">
          <p>
            <img src="/svg/phone.svg" alt="phone" className="inline-block mr-1" /> <span className="font-semibold">{t("tel")}</span>: {Tel}
          </p>
          <p>
            <img src="/svg/location.svg" alt="location" className="inline-block mr-1" /> <span className="font-semibold">{t("city")}</span>: {City}
          </p>
        </div>
      )}

      {/* Przyciski akcji */}
      {user && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => {
              if (editElement == null) setEditElement(id);
            }}
            className="flex-1 text-center px-3 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition"
          >
            {editElement !== id
              ? t("contactbook.edit")
              : t("contactbook.editLoading")}
          </button>

          <button
            className="flex-1 text-center px-3 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition"
            onClick={() => {
              setRemove(true);
              removepeople(id, user?.token, logout).then(() => {
                refresh();
                setRemove(false);
              });
            }}
          >
            {remove
              ? t("contactbook.deleteLoading")
              : t("contactbook.delete")}
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonInfo;
