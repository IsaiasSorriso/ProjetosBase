import { useState } from "react";

export default function Login({ onEsqueciSenha }) {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    if (!form.email || !form.senha) {
      setMsg("Preencha todos os campos.");
      return;
    }
    try {
      const res = await fetch("https://sua-api.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMsg("Login realizado com sucesso!");
      } else {
        setMsg(data.error || "E-mail ou senha inválidos.");
      }
    } catch {
      setMsg("Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="senha"
        placeholder="Senha"
        value={form.senha}
        onChange={handleChange}
        required
      />
      <button type="submit">Entrar</button>
      <button
        type="button"
        style={{ background: "none", color: "#3a7bd5", textDecoration: "underline", marginTop: "0.5rem" }}
        onClick={onEsqueciSenha}
      >
        Esqueci minha senha
      </button>
      {msg && <p>{msg}</p>}
    </form>
  );
}