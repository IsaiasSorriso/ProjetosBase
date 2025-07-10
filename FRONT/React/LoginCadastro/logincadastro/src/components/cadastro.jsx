import { useState } from "react";

export default function Cadastro() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    if (!form.nome || !form.email || !form.senha) {
      setMsg("Preencha todos os campos.");
      return;
    }
    if (form.senha.length < 6) {
      setMsg("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    try {
      const res = await fetch("https://sua-api.com/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Cadastro realizado com sucesso! Faça login.");
        setForm({ nome: "", email: "", senha: "" });
      } else {
        setMsg(data.error || "Erro ao cadastrar.");
      }
    } catch {
      setMsg("Erro de conexão com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
      />
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
        minLength={6}
      />
      <button type="submit">Cadastrar</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}