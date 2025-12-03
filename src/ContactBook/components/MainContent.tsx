import { useTranslation } from "react-i18next";
import { persons, addpeople} from "../Api/Person";
import Form from "./Form";
import { use, useContext, useEffect, useState, type ReactElement } from "react";
import ButtonShow from "./ButtonShow";
import PersonInfo from "./Personinfo";
import EditContact from "./EditContact";
import { UserProvider, useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

import type { PersonTab } from "../Api/Person";

function MainContent() {
  const { t } = useTranslation();
  const [formVisible, setFormVisible] = useState(false);
  const [reload, setReload] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [peopleList, setPeopleList] = useState<PersonTab>([]);

  const [name, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [editElement , setEditElement] = useState<number | null>(null)


  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(peopleList.length / itemsPerPage);

  const { user, logout } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {navigate('/'); return};

    const fetchPeople = async () => {
      const data = await persons(user.token, logout);
      setPeopleList(data);
    };

    const checkAcces = async () => {
      const response = await fetch('/apiv2/apps/acces',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ app: "Contact book" }),
      });
      if (response.status === 401) {
          logout(); 
          navigate('/');
          return;
        }
      if(!response.ok) {
        navigate('/');
        return;
      }
      const data = await response.json();
      if(!data.access) navigate('/');
      else fetchPeople();
    }
    checkAcces();
  }, [user, reload]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(totalPages);
  }, [peopleList]);

  const getPages = (): ReactElement => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <>
        {pages.map((p) => (
          <button
            key={p}
            className={`px-3 py-1 rounded ${page === p ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-200"}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </>
    );
  };


  return (
      <section className="flex flex-col items-center bg-[#23263A] min-h-full w-full py-6">
        <div className="w-11/12 h-full sm:w-3/4 lg:w-2/5 bg-[#333757] shadow-lg rounded-xl p-3 sm:p-6 flex flex-col items-center space-y-4">

          <button className={`${formVisible ? "invisible" : ""} flex-1 text-center px-3 py-1 bg-green-500 text-white font-bold rounded hover:bg-green-600`} onClick={() => setFormVisible(!formVisible)}>{t('contactbook.addContact')}</button>

          {formVisible && <Form onAdd={addpeople} refresh={() => { setReload(reload + 1); setFormVisible(false); }} />}


          <h1 className="text-4xl text-white font-bold">{t("title")}</h1>

          <div className="grid grid-cols-4 gap-1 sm:gap-2">
            <input name="filterName" type="text" onChange={(e)=>{setName(e.target.value); setPage(1)}} className="bg-[#414877] text-white p-1 sm:p-2" value={name} placeholder={t('contactbook.namePlaceholder')}></input>
            <input name="filterCity" type="text" onChange={(e)=>{setCity(e.target.value); setPage(1)}} className="bg-[#414877] text-white p-1 sm:p-2" value={city} placeholder={t('contactbook.cityPlaceholder')}></input>
            <input name="filterTel" type="text" onChange={(e)=>{setTel(e.target.value); setPage(1)}} className="bg-[#414877] text-white p-1 sm:p-2" value={tel} placeholder={t('contactbook.phonePlaceholder')}></input>
            <button className="cursor-pointer px-1 sm:px-3 py-1 m-1 bg-red-400 hover:bg-red-500 rounded-md text-white" onClick={() => {setName(""); setCity(""); setTel(""); setPage(1);}}>{t('contactbook.clear')}</button>
          </div>



          <div className="flex gap-2 my-2">{getPages()}</div>
          
          <div className="grid grid-cols-1 sm:w-2/3 md:w-2/3 gap-4 w-full h-full overflow-y-auto auto-rows-max">
            {peopleList.length === 0
              ? <p className="text-white text-center text-2xl">{t('contactbook.loading')}</p>
              : peopleList.filter(person =>(name === "" || person.Name.toLowerCase().includes(name.toLowerCase())) &&
                                  (city === "" || person.City.toLowerCase().includes(city.toLowerCase())) &&
                                  (tel === "" || person.Tel.includes(tel))).slice(startIndex, endIndex).map(person => (
                <PersonInfo
                  key={person.id}
                  {...person}
                  refresh={() => setReload(reload +1)}
                  setEditElement = {setEditElement}
                  editElement={editElement}
                />
              ))
            }
          </div>

          <div className="flex gap-2 mt-4">{getPages()}</div>
          
          {editElement != null && <EditContact id={editElement} setEditElement = {setEditElement} refresh={() => setReload(reload + 1)}/>}
          
        </div>
      </section>
  );
}

export default MainContent;
