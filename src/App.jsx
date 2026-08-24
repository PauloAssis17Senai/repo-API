import { useState, useEffect } from 'react'

function App() {
  const [tarefas, setTarefas] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=100')
      .then((response) => response.json())
      .then((data) => {
        setTarefas(data)
        setCarregando(false)
      })
      .catch((error) => {
        console.error('Erro ao buscar tarefas:', error)
        setCarregando(false)
      })
  }, [])
//.
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          
          <div className="card shadow-sm border-0">
            {/* Cabeçalho do Card */}
            <div className="card-header bg-primary text-white p-3">
              <h2 className="h4 mb-1">Tarefas vindas da API</h2>
              <p className="mb-0 opacity-75 small">
                Consumindo dados de JSONPlaceholder via fetch e useEffect
              </p>
            </div>

            {/* Corpo do Card */}
            <div className="card-body p-0">
              {carregando ? (
                /* State de Carregando com Spinner do Bootstrap */
                <div className="text-center my-5 py-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                  <p className="mt-2 text-muted small">Buscando lista de tarefas...</p>
                </div>
              ) : (
                /* Lista de Tarefas */
                <ul className="list-group list-group-flush">
                  {tarefas.map((item) => (
                    <li 
                      key={item.id} 
                      className="list-group-item d-flex justify-content-between align-items-center py-3"
                    >
                      <span className={item.completed ? 'text-decoration-line-through text-muted' : 'fw-medium'}>
                        {item.title}
                      </span>
                      
                      {/* Badge de Status */}
                      {item.completed ? (
                        <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
                          Concluída
                        </span>
                      ) : (
                        <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill">
                          Pendente
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App