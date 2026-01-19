import { useState } from "react";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [mode, setMode] = useState(null);

  return (
    <div className="login-container">
      {mode === null && (
        <div>
          <h1>Bem Vindo</h1>
          <p>Escolha uma opção para continuar</p>
          <button onClick={() => setMode("login")}>Entrar</button>
          <button onClick={() => setMode("signup")}>Criar Conta</button>
        </div>
      )}

      {mode === "login" && <Login setMode={setMode} />}

      {mode === "signup" && <h2>Tela de cadastro (Em construção)</h2>}
    </div>
  );
}

export default App;
