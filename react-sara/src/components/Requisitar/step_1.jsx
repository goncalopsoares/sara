import React from 'react';
import { FaArrowAltCircleRight } from "react-icons/fa";

const Step1 = ({ ucs, selectedUc, selectedProfessor, professores, handleUcSelect, handleProfessorSelect, goToNextStep }) => {
  return (
    <div>
      <h2 className='mt-5 mb-5'>Escolha a UC e o Professor</h2>
      {ucs.map(uc => (
        <div className='bg-grey-100 mb-4' key={uc.id_uc_contexto}>
          <h4>{uc.nome_uc_contexto}</h4>
          <p>{uc.sigla_uc_contexto}</p>
          <button className=' text-green-400 p-3' onClick={() => handleUcSelect(uc)}>Selecionar UC</button>

          {selectedUc && selectedUc.id_uc_contexto === uc.id_uc_contexto && (
            <div>
              <select onChange={handleProfessorSelect}>
                <option value="">Professor</option>
                {professores.map(professor => (
                  <option key={professor.id_utilizador} value={professor.id_utilizador}>
                    {professor.nome_utilizador}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      ))}
      {selectedUc && selectedProfessor && (
        <FaArrowAltCircleRight className='text-end' size={40} onClick={goToNextStep} />
      )}
    </div>
  );
};

export default Step1;
