import { useState,useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[]);

  return <AppRoutes user={user} setUser={setUser} />;
}

export default App;