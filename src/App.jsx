import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  checkToken,
  refreshToken as apiRefreshToken,
} from "./services/auth.service";
import "./App.css";

function App() {
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validateSession() {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setMode(null);
        setLoading(false);
        return;
      }

      // 1. tenta validar access token
      const check = await checkToken();

      if (check.success) {
        setMode("logged");
        setLoading(false);
        return;
      }

      // 2. tenta refresh
      const refresh = await apiRefreshToken();

      if (refresh.success) {
        localStorage.setItem(
          "accessToken",
          refresh.data.accessToken.token
        );
        setMode("logged");
      } else {
        localStorage.clear();
        setMode(null);
      }

      setLoading(false);
    }

    validateSession();
  }, []);

  function logout() {
    localStorage.clear();
    setMode(null);
  }

  if (loading) {
    return <p>Validando sessão...</p>;
  }

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
      {mode === "signup" && <Signup setMode={setMode} />}

      {mode === "logged" && (
        <div>
          <h1>🎉 Parabéns!</h1>
          <p>Você está logado com sucesso 😎</p>
          <button onClick={logout}>Sair</button>
        </div>
      )}
    </div>
  );
}

export default App;
