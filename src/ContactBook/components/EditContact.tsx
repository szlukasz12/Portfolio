import { getoneperson, editpeople } from "../api/Person";
import { useState, useEffect, type ReactElement } from "react";
import { useUser } from "../../Context/UserContext";
import { useTranslation } from "react-i18next";

import type { Person } from "../api/Person";

type DataPerson = {
  id: number;
  setEditElement: (id: number | null) => void;
  refresh: () => void;
};

const EditContact = ({ id, setEditElement, refresh }: DataPerson): ReactElement | null => {
  const [person, setPerson] = useState<Person | null>(null);
  const [Name, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const { user, logout } = useUser();
  const [save, setSave] = useState<boolean>(false);
  const { t } = useTranslation();

  const update = async () => {
    setSave(true);
    const res = await editpeople(id, Name, tel, city, user?.token || "", logout);
    if (res) {
      setEditElement(null);
      refresh();
      setSave(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    (async () => {
      const data: Person | null = await getoneperson(id, user?.token || "", logout);
      if (data) {
        setPerson(data);
        setName(data.Name || "");
        setTel(data.Tel || "");
        setCity(data.City || "");
      }
    })();
  }, [id, user]);

  if (!person) return null;

  return (
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-[#414877] p-6 rounded-3xl border-4 border-[#191c31] shadow-2xl">
      <h2 className="text-center text-3xl text-white font-bold mb-5">
        {t("contactbook.editContact")}
      </h2>

      <form className="flex flex-col gap-4 text-white text-lg" onSubmit={(e) => e.preventDefault()}>
        {/* Imię */}
        <div className="flex flex-col">
          <label htmlFor="Name" className="mb-1 font-semibold text-gray-200">
            {t("name")}
          </label>
          <input
            id="Name"
            required
            type="text"
            autoComplete="off"
            className="p-2 rounded bg-[#333757] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("contactbook.namePlaceholder")}
          />
        </div>

        {/* Telefon */}
        <div className="flex flex-col">
          <label htmlFor="Tel" className="mb-1 font-semibold text-gray-200">
            {t("tel")}
          </label>
          <input
            id="Tel"
            required
            type="text"
            autoComplete="off"
            className="p-2 rounded bg-[#333757] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder={t("contactbook.phonePlaceholder")}
            maxLength={9}
            inputMode="numeric"
            pattern="[0-9]*"
            title={t("contactbook.phoneValidationMessage")}
          />
        </div>

        {/* Miasto */}
        <div className="flex flex-col">
          <label htmlFor="City" className="mb-1 font-semibold text-gray-200">
            {t("city")}
          </label>
          <input
            id="City"
            required
            type="text"
            autoComplete="off"
            className="p-2 rounded bg-[#333757] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t("contactbook.cityPlaceholder")}
          />
        </div>

        {/* Przyciski */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={update}
            className="flex-1 py-2 text-center font-semibold bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            {save ? t("contactbook.saving") : t("contactbook.save")}
          </button>
          <button
            type="button"
            onClick={() => setEditElement(null)}
            className="flex-1 py-2 text-center font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            {t("contactbook.cancel")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditContact;
