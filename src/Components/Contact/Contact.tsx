import { useState } from "react";
import emailjs from "emailjs-com";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  const inputClass =
    "w-3/4 h-20 bg-slate-700 p-2 m-2 text-2xl text-white rounded-md outline-none focus:ring-2 focus:ring-red-400";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState<boolean>(false)
  const [toast, setToast] = useState<string | null>(null);

const sendEmail = async (e: React.FormEvent) => {
  e.preventDefault();

  if(message.length < 5)
  {
    setToast(t('contact.toast.tooShort'));
    setTimeout(() => setToast(null), 2000);
  }
  else if(message.length > 300)
  {
    setToast(t('contact.toast.tooLong'));
    setTimeout(() => setToast(null), 2000);
  }
  else
  {
  setSending(true);
    try {
      const response = await fetch(
        "/apiv2/contact/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            Message: message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Błąd podczas wysyłki");
      }

      const data = await response.json();
      // Pomyślna wysyłka
      if(data.success)
      {
        setToast(t('contact.toast.sent'));
        setEmail("");
        setMessage("");
        setSending(false);
        setTimeout(() => setToast(null), 2000);
      }
      else
      {
        setToast(t('contact.toast.error'));
        setSending(false);
        setTimeout(() => setToast(null), 3000);
      }
    } catch (error) {
      console.error("Directus error:", error);
      setToast(t('contact.toast.error'));
      setSending(false);
      setTimeout(() => setToast(null), 3000);
    }
  }
};


  return (
    <div
      id="Contact"
      className="relative w-full sm:w-3/4 max-w-4xl h-full flex flex-col justify-center bg-gray-800 p-6 rounded-lg"
    >
      <h1 className="text-4xl sm:text-6xl my-2 font-bold text-red-400 mb-4 text-left underline underline-offset-8">
        {t('contact.title')}
      </h1>

      <form onSubmit={sendEmail} className="flex flex-col">
        <input
          id="Email"
          autoComplete="Email"
          className={inputClass}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder={t('contact.emailPlaceholder')}
          type="email"
          required
        />
        <input
          id="Message"
          className={inputClass}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder={t('contact.messagePlaceholder')}
          type="text"
          required
        />
        <button
          type="submit"
          className="text-white bg-red-400 hover:bg-red-500 m-2 w-60 text-2xl p-2 my-3 text-center rounded-md transition-colors duration-300"
        >
          {!sending ? t('contact.send') : t('contact.sending')}
        </button>
      </form>
      {toast && (
        <div className="fixed bg-gray-900 bottom-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Contact;
