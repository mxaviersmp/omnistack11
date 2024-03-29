import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()
  const ongId = localStorage.getItem('ongId')

  async function handleNewIncident(event) {
    event.preventDefault()
    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      alert('Novo caso cadastrado')
      history.push('/profile')
    } catch (error) {
      alert('Erro no cadastro, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"></img>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para casos
          </Link>
        </section>
        <form onSubmit={handleNewIncident} >
          <input type="text" placeholder="Título do caso" 
            value={title} onChange={event => setTitle(event.target.value)} />
          <textarea type="text" placeholder="Descrição" 
            value={description} onChange={event => setDescription(event.target.value)} />
          <input type="text" placeholder="Valor em reais" 
            value={value} onChange={event => setValue(event.target.value)} />
          
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
