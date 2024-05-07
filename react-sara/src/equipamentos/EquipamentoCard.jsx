import React from 'react';

const EquipamentoCard = ({ equipamento }) => {
  return (
<div className="max-w-xs rounded overflow-hidden shadow-lg bg-white font-poppins justify-center">
    <div className="flex p-4 items-start gap-4">
     <div className="rounded-xl  p-4 bg-grey-100">
        <img className="max-w-full max-h-full"
             src="https://static.vecteezy.com/system/resources/previews/009/400/746/non_2x/dslr-photo-camera-clipart-design-illustration-free-png.png"
             alt={equipamento.nome_marca_equipamento}
        />
      </div>
    </div>
      <div className="px-6 py-4">
        <div className="font-bold text-h3 mb-2">{equipamento.nome_marca_equipamento}</div>
        <div className="font-bold text-h3 mb-2">{equipamento.nome_modelo_equipamento}</div>
        <p className="text-gray-400 text-sm">
          {equipamento.nome_sub_categoria}
        </p>
        <p className="text-gray-400 text-base">
          ID: {equipamento.id_interno_equipamento}
        </p>
        <p className="text-gray-400 text-base">
          Núm. Série: {equipamento.numero_serie_equipamento}
        </p>
      </div>
    </div>
  );
}

export default EquipamentoCard;
