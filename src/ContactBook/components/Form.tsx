import { useState, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../Context/UserContext";

type FormProps = {
  refresh: () => void;
  onAdd: (
    Name: string,
    Tel: string,
    City: string,
    token: string,
    logout: () => void
  ) => Promise<boolean>;
};

const Form = ({ onAdd, refresh }: FormProps): ReactElement => {
  const [firstName, setFirstName] = useState("");
  const [tel, setTel] = useState<string>("");
  const [city, setCity] = useState("");
  const { t } = useTranslation();
  const { user, logout } = useUser();
  const [loading, setLoading] = useState(false);

  const update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onAdd(firstName, tel, city, user?.token || "", logout);
      refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md bg-[#414877] p-6 rounded-3xl border-4 border-[#191c31] shadow-2xl">
      <h2 className="text-center text-3xl text-white font-bold mb-5">
        {t("contactbook.addNew")}
      </h2>

      <form
        onSubmit={update}
        className="flex flex-col gap-4 text-white text-lg"
      >
        {/* Imię */}
        <div className="flex flex-col">
          <label
            htmlFor="Name"
            className="mb-1 font-semibold text-gray-200"
          >
            {t("name")}
          </label>
          <input
            id="Name"
            required
            type="text"
            autoComplete="off"
            className="p-2 rounded bg-[#333757] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder={t("contactbook.namePlaceholder")}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Telefon */}
        <div className="flex flex-col">
          <label
            htmlFor="Tel"
            className="mb-1 font-semibold text-gray-200"
          >
            {t("tel")}
          </label>
          <input
            id="Tel"
            required
            type="text"
            autoComplete="off"
            className="p-2 rounded bg-[#333757] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder={t("contactbook.phonePlaceholder")}
            onChange={(e) => setTel(e.target.value)}
            maxLength={9}
            inputMode="numeric"
            pattern="[0-9]*"
            title={t("contactbook.phoneValidationMessage")}
          />
        </div>

        {/* Miasto */}
        <div className="flex flex-col">
          <label
            htmlFor="City"
            className="mb-1 font-semibold text-gray-200"
          >
            {t("city")}
          </label>
          <input
            id="City"
            required
            type="text"
            autoComplete="off"
            className="p-2 rounded bg-[#333757] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder={t("contactbook.cityPlaceholder")}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Przyciski */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 py-2 text-center font-semibold bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            {loading
              ? t("contactbook.saving")
              : t("contactbook.save")}
          </button>
          <button
            type="button"
            onClick={() => refresh()}
            className="flex-1 py-2 text-center font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            {t("contactbook.cancel")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
