import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import InstagramUpload from "./components/InstagramUpload";

export interface User {
  username: string;
  followers: string[];
  following: string[];
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleDataUpload = (data: {
    username: string;
    followers: string[];
    following: string[];
  }) => {
    const userData: User = {
      username: data.username,
      followers: data.followers,
      following: data.following,
    };
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app">
      {!user ? (
        <InstagramUpload onDataUpload={handleDataUpload} />
      ) : (
        <>
          <header className="app-header">
            <h1>📸 Insta Check</h1>
            <p>Análise dos seus seguidores do Instagram</p>
          </header>
          <main className="app-main">
            <Dashboard user={user} onLogout={handleLogout} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
