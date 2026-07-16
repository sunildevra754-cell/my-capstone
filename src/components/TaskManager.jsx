import { useState } from 'react'

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          aria-label="New task"
        />
        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 ? (
        <p className="task-empty">No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <span
                  className={task.completed ? 'task-text completed' : 'task-text'}
                >
                  {task.text}
                </span>
              </label>
              <button
                type="button"
                className="task-delete"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete "${task.text}"`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .task-manager {
          max-width: 480px;
          margin: 0 auto;
          padding: 24px;
          text-align: left;
        }

        .task-manager h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .task-form {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .task-form input {
          flex: 1;
          padding: 8px 12px;
          font-size: 16px;
          font-family: inherit;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--bg);
          color: var(--text-h);
        }

        .task-form input:focus {
          outline: 2px solid var(--accent);
          outline-offset: 1px;
        }

        .task-form button,
        .task-delete {
          padding: 8px 16px;
          font-size: 14px;
          font-family: inherit;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          background: var(--accent-bg);
          color: var(--accent);
          transition: box-shadow 0.2s;
        }

        .task-form button:hover,
        .task-delete:hover {
          box-shadow: var(--shadow);
        }

        .task-empty {
          text-align: center;
          color: var(--text);
        }

        .task-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .task-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--code-bg);
        }

        .task-label {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          cursor: pointer;
        }

        .task-text.completed {
          text-decoration: line-through;
          color: var(--text);
        }

        .task-delete {
          flex-shrink: 0;
          padding: 4px 10px;
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}

export default TaskManager
