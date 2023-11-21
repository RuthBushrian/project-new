import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OpenFile from './Components/file/openFile';
import AllFiles from './Components/file/allFiles';
import Login from './Components/login';
import { useNavigate, useLocation } from "react-router-dom"
import Menu from './Components/menu';
import Dashboard from './Components/Dashboard/dashboard';
import Setting from './Components/setting';
import UserProvider from "./Components/user/UserProvider";
import { useEffect, useState } from 'react'
function App() {

  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user")
    if (!userFromLocalStorage) return;
    const parsedUser = JSON.parse(userFromLocalStorage)
    setUserId(parsedUser.idofficer)
  }, []);

  const setUserIdCallback = (id) => {
    setUserId(id);
  }

  return (<>
    <UserProvider userId={userId}>

      <div className="App" dir="rtl" style={{ fontFamily: 'Segoe UI' }}>
        {userId === '' ? <Login setUserId={setUserIdCallback}></Login> : <><Menu></Menu><Routes>

          <Route exact path='/' element={<Login setUserId={setUserIdCallback}></Login>}></Route>
          <Route exact path='/OpenFile' element={< OpenFile />}></Route>
          <Route exact path='/File' element={<div>< OpenFile /></div>}></Route>
          <Route exact path='/AllFiles' element={< AllFiles />}></Route>
          <Route exact path='/Dashboard' element={< Dashboard />}></Route>
          <Route exact path='/Setting' element={< Setting />}></Route>

        </Routes></>}

      </div>
    </UserProvider>

  </>
  );
}

export default App;
