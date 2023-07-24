import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "./pages/Auth/Login"
import Home from "./pages/Home/Home"
import withAuth from "./hocs/withAuth"

export default function App() {

    const HomePage = withAuth(Home);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Index/>} />
          <Route path="/" element={<HomePage/>}/> {/*it's like a middleware */}
        </Routes>
      </BrowserRouter>
    )
}
