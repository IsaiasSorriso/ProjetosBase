import { useState } from 'react'
import './App.css'
import Login from './components/login'
import Cadastro from './components/cadastro'
import EsqueciSenha from './components/EsqueciSenha'

function App() {
  const [tela, setTela] = useState("login"); // "login", "cadastro", "esqueci"

  return (
    <div className="app">
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setTela("login")}>Login</button>
        <button onClick={() => setTela("cadastro")}>Cadastro</button>
      </div>
      {tela === "login" && <Login onEsqueciSenha={() => setTela("esqueci")} />}
      {tela === "cadastro" && <Cadastro />}
      {tela === "esqueci" && <EsqueciSenha onVoltar={() => setTela("login")} />}
    </div>
  )
}

export default App