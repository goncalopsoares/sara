import React from 'react';
import EquipamentoCard from './EquipamentoCard';

export default function EquipamentoList({ equipamentos }) {
    return (
        <div className="grid grid-cols-5 gap-4">
          {equipamentos.map(equipamento => (
            <EquipamentoCard key={equipamento.id_equipamento} equipamento={equipamento} />
          ))}
        </div>
      );
}