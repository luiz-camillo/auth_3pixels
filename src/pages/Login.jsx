import { useState } from "react";
import { preSignin, checkEmail, checkPhone } from "../services/auth.service";

function Login() {
  const [step, setStep] = useState("cpf"); // cpf | email | phone
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      if (step === "cpf") {
        const exists = await preSignin(cpf);
        if (!exists) {
          setError("CPF não encontrado");
          return;
        }
        setStep("email");
      }

      if (step === "email") {
        const exists = await checkEmail(cpf, email);
        if (!exists) {
          setError("E-mail não confere com o CPF");
          return;
        }
        setStep("phone");
      }

      if (step === "phone") {
        const exists = await checkPhone(cpf, phone);
        if (!exists) {
          setError("Telefone não confere com o CPF");
          return;
        }

        alert("CPF, e-mail e telefone validados");
        // próximo passo: senha
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Login</h2>

      {step === "cpf" && (
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      )}

      {step === "email" && (
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      {step === "phone" && (
        <input
          type="text"
          placeholder="Telefone (somente números)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      )}

      <button onClick={handleSubmit} disabled={loading}>
        Continuar
      </button>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
