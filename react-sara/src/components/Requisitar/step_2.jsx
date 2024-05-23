import React from 'react';

const Step2 = ({ utilizadores, selectedGroupMembers, handleUtilizadoresChange, handleRemoveGroupMember, formData, handleInputChange, handleSubmit }) => {
  return (
    <div>
      <h3 className='mt-5 mb-5'>Informação geral</h3>
      <div className="group-container">
        <h4>Elementos do grupo</h4>
        <div className="select-container">
          <select onChange={handleUtilizadoresChange} className="select-dropdown">
            <option value="">Selecione os elementos do grupo</option>
            {utilizadores.filter(u => u.tipo_utilizador === 3 && !selectedGroupMembers.some(s => s.id_utilizador === u.id_utilizador)).map(u => (
              <option key={u.id_utilizador} value={u.id_utilizador}>
                {u.nome_utilizador} - {u.numero_mecanografico_utilizador}
              </option>
            ))}
          </select>
          <ul className="group-list">
            {selectedGroupMembers.map(u => (
              <li key={u.id_utilizador} className="group-list-item">
                {u.nome_utilizador} - {u.numero_mecanografico_utilizador}
                <button onClick={() => handleRemoveGroupMember(u.id_utilizador)} className="p-2 text-red-600">Remover</button>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Nome da Requisição:</label>
            <input
              type="text"
              name="nome_requisicao"
              value={formData.nome_requisicao}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Contexto da Requisição:</label>
            <textarea
              name="contexto_requisicao"
              value={formData.contexto_requisicao}
              onChange={handleInputChange}
              required
              rows="4"
              className="form-control"
            />
          </div>
          <button type="submit" className="bg-green-200 p-2 mt-2 text-black fw-bolder rounded-2">Criar Requisição</button>
        </form>
      </div>
    </div>
  );
};

export default Step2;
