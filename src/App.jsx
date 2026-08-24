import { useState, useEffect } from 'react'
import './App.css'

// Hooks useEffect, useState
function App() {
const [tarefas, setTarefas] = useState([])
const [carregando, setCarregando] = useState(true)
// useEffect com fetch (requisições assíncronas) para buscar as tarefas da API

useEffect(() => {
  fetch('http://jsonplaceholder.typicode.com/todos?_limit=100')
    .then((response) => response.json())
    .then((data) => {
      setTarefas(data) // salva os dados vindos da api no estado async
      setCarregando(false) //Desativa a mensagem carregando
    })
    .catch((error) => {
      console.error('Erro ao buscar tarefas:', error)
      setCarregando(false)
    })
}, []) //Array vazio para evitar um loop infinito
  return (
    <>
      <div>
        <div>
          <h2>Tarefas vindas da API</h2>
          <p>Consumindo dados de JSONplaceholder via fetch e useEffect</p>
          {carregando ? (
            <div>Carregando...</div>
          ) : (
            <ul>
              {tarefas.map((item) => (
                <li key={item.id}>{item.title}
                {item.completed ? ' Concluída' : ' Pendente'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default App
