import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EquipamentoList from './EquipamentoList';
import EquipamentoFilter from './EquipamentoFilter';

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://laravel.local:8080/api/equipamentos')
      .then(response => {
        console.log('Equipamentos:', response.data);
        const result = response.data.equipamentos;
        setEquipamentos(result);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao obter equipamentos:', error);
        setError(error);
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return <p>A carregar equipamentos...</p>;
  }

  if (error) {
    console.error('Erro ao carregar os equipamentos:', error);
    return <p>Lamentamos, mas ocorreu um erro ao carregar os equipamentos.</p>;
  }

  return (
    <div>
      <EquipamentoFilter equipamentos={equipamentos} />
      <EquipamentoList equipamentos={equipamentos} />
     </div>
  );
}
