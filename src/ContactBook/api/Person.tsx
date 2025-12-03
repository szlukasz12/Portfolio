import { data, useNavigate } from "react-router-dom"

export type PersonTab = {id: number, Name: string, Tel: string, City: string}[];
export type Person = {id: number, Name: string, Tel: string, City: string};

const persons = async (token: string, logout: () => void): Promise<PersonTab> => {
  try {
    const response = await fetch("/apiv2/contacts/list", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    });

    if(response.status === 401){
      logout();
      return [];
    }

    if (!response.ok) {
      throw new Error("Błąd połączenia");
    }

    const data = await response.json();

    if(data)
    {
      const simpledata: PersonTab = data.map((contact: Person) => ({
        id: contact.id,
        Name: contact.Name,
        City: contact.City,
        Tel: String(contact.Tel)
      }));
      return simpledata;
    }
    else{
      return [];
    }

  } catch (error) {
    console.error(error);
    return []; // lub null, zależnie od tego, co oczekujesz
  }
};


const addpeople= async (name: string,tel: string, city: string, token: string, logout: () => void): Promise<boolean> =>
{
  try{
    const response = await fetch("/apiv2/contacts/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({Name: name, Tel: tel, City: city})
    });

    if(response.status === 401){
      logout();
      return false;
    }

    if(!response.ok)
    {
      throw new Error("Nie udało się dodać.")
    }
    const data = await response.json();
    
    if(data)
    {
      return true;
    }
    else{
      return false;
    }

  }
  catch(error){
    console.log(error)
    return false;
  }
}

const removepeople = async (id: number, token: string, logout: () => void) : Promise<boolean> =>
{
  try{
    const response = await fetch(`/apiv2/contacts/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    if(response.status === 401){
      logout();
      return false;
    }

    if(!response.ok)
    {
      throw new Error("Nie udało się usunąć.")
    }

    const data: { Status: string } = await response.json();

    if(data)
    {
      return true;
    }
    else{
      return false;
    }
  }
  catch (error) {
    console.log(error)
    return false;
  }
}

const getoneperson = async (id: number, token: string, logout: () => void) : Promise<Person | null> => {
  try {
    const response = await fetch(`/apiv2/contacts/contact/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    });

    if(response.status === 401){
      logout();
      return null;
    }

    if (!response.ok) {
      throw new Error("Błąd połączenia");
    }

    const data = await response.json();

    if(data)
    {
      return data;
    }
    else{
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const editpeople = async (id: number, name: string, tel: string, city: string, token: string, logout: () => void) : Promise<boolean> =>{
  try{
    const response = await fetch(`/apiv2/contacts/edit/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({Name: name, Tel: String(tel), City: city})
    });

    if(response.status === 401){
      logout();
      return false;
    }

    if(!response.ok)
    {
      throw new Error("Nie udało się zaaktualizować.")
    }

    const data: { Status: string } = await response.json();

    if(data)
    {
      return true;
    }
    else{
      return false;
    }
  }
  catch(error){
    console.log(error)
    return false;
  }
}

export {persons, getoneperson, editpeople, addpeople, removepeople};
