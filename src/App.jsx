import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stage_1 from "./components/Stage_1";
import Stage_2 from "./components/Stage_2";
import Stage_3 from "./components/Stage_3";
import Header from "./components/Header";
import Footer from "./components/Footer";
import marsBackground from "./assets/mars_background.jpg";

function App() {
  const [userInfo, setUserInfo] = useState({});
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div
          style={{
            backgroundImage: `url(${marsBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <main className="w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
            <Routes>
              <Route path="/" element={<Stage_1 userInfo={userInfo} setUserInfo={setUserInfo} />} />
              <Route path="/stage-2" element={<Stage_2 userInfo={userInfo} setUserInfo={setUserInfo} />} />
              <Route path="/stage-3" element={<Stage_3 userInfo={userInfo} setUserInfo={setUserInfo} />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;