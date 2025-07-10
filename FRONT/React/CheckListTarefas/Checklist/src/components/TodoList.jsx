import { useState } from 'react';
import img from '../assets/imgconsquista.jpg'

export default function TodoList({ todos, addTodo, toggleTodo, deleteTodo }) {
  const [newTodo, setNewTodo] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [filter, setFilter] = useState("all"); // "all", "done", "notdone"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    addTodo(newTodo);
    setNewTodo("");
  };

  const handleToggle = (id) => {
    toggleTodo(id);
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 4000); // Fecha após 4 segundos
    }
  };

  // Filtro das tarefas
  const filteredTodos = todos
    .filter(todo => {
      if (filter === "done") return todo.completed;
      if (filter === "notdone") return !todo.completed;
      return true;
    })
    .slice()
    .sort((a, b) => a.completed - b.completed);

  return (
    <div className="todo-list">
      {showCongrats && (
        <div className="congrats-modal">
          <div className="congrats-content">
            <h2>Parabéns!</h2>
            <p>Você concluiu uma tarefa! Agora você pode ficar 1:30hrs jogando/assistindo ou aproveitar o seu descanso 😄</p>
            <img src={img} alt="" className="congrats-img" />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Adicione uma tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("notdone")}>Não feitas</button>
        <button onClick={() => setFilter("done")}>Concluídas</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => handleToggle(todo.id)}
              style={{ cursor: "pointer" }}
            >
              {todo.completed ? "✅ " : ""}
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}