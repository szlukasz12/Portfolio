import { BrowserRouter as Router, Routes, Route, Link, data } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Home"
import MainContent from "./ContactBook/components/MainContent";
import Contact from "./Components/Contact/Contact";
import Account from "./Components/Account/Account";
import { useEffect, useState } from "react";
import { UserProvider } from "./Context/UserContext";
import "./app.css";

function App() {
  
  useEffect(()=>{

    type DataFromApi ={
      Name: string;
      Link: string
    }

    fetch('/apiv2/apps/list', {
      method: "GET"
    })
    .then(response => {
      if(!response.ok)
      {
        throw new Error("błąd sieci" + response.status)
      }
      else{
        return response.json();
      }
    })
    .then(data => {
      const simpledata = data.map((link: DataFromApi) => ({name: link.Name, link: link.Link}))
    })
    .catch(error => {
      console.error(error)
    })
  },[])

  return (
    <>
      <Router>
        <UserProvider>
          <Header/>
          <main className="w-full flex-l flex flex-col items-center bg-gray-800 h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/account" element={<Account />} />
              <Route path="/contactlist" element={<MainContent />} />
            </Routes>
          </main>
        </UserProvider>
      </Router>
    </>
  )
}

export default App  