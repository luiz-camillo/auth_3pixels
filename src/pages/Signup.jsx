import { useState } from "react";
import { signup } from "../services/auth.service";

function Signup({ setMode }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    identifier: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    address: "",
    zipCode: "",
    birthday: "",
    complement: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      const response = await signup(form);

      if (!response.success) {
        setError(response.error?.message || "Erro ao criar conta");
        return;
      }

      alert("CONTA CRIADA COM SUCESSO");
      setMode("login");
    } catch {
      setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Criar Conta</h2>

      <input
        placeholder="Nome"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="E-mail"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        placeholder="CPF"
        value={form.identifier}
        onChange={(e) =>
          setForm({ ...form, identifier: e.target.value })
        }
      />

      <input
        placeholder="Telefone"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Confirmar senha"
        value={form.passwordConfirm}
        onChange={(e) =>
          setForm({ ...form, passwordConfirm: e.target.value })
        }
      />

      <input
        placeholder="Endereço"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <input
        placeholder="CEP"
        value={form.zipCode}
        onChange={(e) =>
          setForm({ ...form, zipCode: e.target.value })
        }
      />

      <input
        type="date"
        value={form.birthday}
        onChange={(e) =>
          setForm({ ...form, birthday: e.target.value })
        }
      />

      <input
        placeholder="Complemento"
        value={form.complement}
        onChange={(e) =>
          setForm({ ...form, complement: e.target.value })
        }
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Aguarde..." : "Criar Conta"}
      </button>

      <button type="button" onClick={() => setMode(null)}>
        Voltar
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Signup;
