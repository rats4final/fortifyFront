import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "./pages/Auth/Login"
import Home from "./pages/Home/Home"
import withAuth from "./hocs/withAuth"
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";

export default function App() {

    const HomePage = withAuth(Home);
    const SettingsPage = withAuth(Settings);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Index/>} />
          <Route path="/" element={<HomePage/>}/> {/*it's like a middleware */}
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/settings-test" element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    )
}
