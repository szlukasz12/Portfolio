import { createContext, useContext, useState, useEffect, type ReactElement, type ReactNode } from "react"
import i18n from "i18next";

type User = {
  id: number;
  login: string;
  token: string;
  role: string;
  name: string;
  lastname: string;
  adres: string;
  joined: string;
  email: string;
  lang: string;
} | null;

type UserContextType = {
  user: User;
  login: (userdata: {Login: string, Password: string}) => Promise<boolean | number>;
  logout: () => void;
  refreshuser: () => Promise<boolean>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const decodeJWT = (token: string): User => {
  var base64Url: string = token.split('.')[1]!;
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload)
}

export const UserProvider = ({children} : {children: ReactNode}) => {
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
      // przy starcie próbujemy odczytać token z localStorage
      const token = localStorage.getItem("token");
      const Login = localStorage.getItem("login");

      const check = async () => {
        const response = await fetch("/apiv2/auth/status", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })

        if(response.status === 401){
          return false;
        }

        if (!response.ok) {
          throw new Error("Błąd połączenia");
        }

        return true;
      }

      if(!token){
        return;
      }

      check().then((data) => {
        if (!data) {
          logout();
        }
      });

      if (token && Login) {
        const payload: User = decodeJWT(token);

        if(payload == null){
          return;
        }
        setUser({login: payload.login, role: payload.role, token, name: payload.name, lastname: payload.lastname, adres: payload.adres, joined: payload.joined, id: payload.id, email: payload.email, lang: payload.lang });
        i18n.changeLanguage(payload.lang || 'pl');
      }
    }, []);

    const refreshuser = async () => {
      try{
        const id: number = 0;

        const response = await fetch("/apiv2/auth/refreshToken", {
          method: "POST",
          headers: {
            "Content-type":"application/json",
            "Authorization": `Bearer ${user?.token}`
          },
        })

        if(response.status === 401){
          logout();
          return false;
        }

        if(!response.ok)
        {
          throw new Error("401")
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token);

        const payload: User = decodeJWT(data.access_token);
        const token = data.access_token;

        if(payload == null){
          return false;
        }
        localStorage.setItem("login", payload.login);
        setUser({login: payload.login, role: payload.role, token, name: payload.name, lastname: payload.lastname, adres: payload.adres, joined: payload.joined, id: payload.id, email: payload.email, lang: payload.lang });
        i18n.changeLanguage(payload.lang || 'pl');
        return true;
      }
      catch (error) {
        //console.log(error)
        return false;
      }
    }

    const login = async ( userData: {Login: string, Password: string }): Promise<boolean | number> => {
      try{
      const id: number = 0;

      const response = await fetch("/apiv2/auth/login", {
        method: "POST",
        headers: {
          "Content-type":"application/json",
        },
        body: JSON.stringify(userData)
      })

      if(response.status === 401){
        const data = await response.json();
        if(typeof data.message === "number"){
          return data.message;
        }
        return 0;
      }

      if(!response.ok)
      {
        throw new Error("401")
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);

      const payload: User = decodeJWT(data.access_token);
      const token = data.access_token;
      if(!payload){
        return false;
      }
      
      localStorage.setItem("login", payload.login);
      setUser({login: payload.login, role: payload.role, token, name: payload.name, lastname: payload.lastname, adres: payload.adres, joined: payload.joined, id: payload.id, email: payload.email, lang: payload.lang });
      i18n.changeLanguage(payload.lang || 'pl');
      return true;
      }
      catch (error) {
        //console.log(error)
        return false;
      }
    };

    const logout = () => {
      localStorage.clear();
      i18n.changeLanguage(user?.lang);
      localStorage.setItem("language", user?.lang || "pl");
      setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, refreshuser }}>
        {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside a UserProvider");
  return context;
};