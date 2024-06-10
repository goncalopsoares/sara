export default function Equipamentos({ listaEquipamentos, tipo_utilizador }) {

    const BASE_URL = "http://deca-sara.ua.pt/sara/public";

    return (
        <>
            {listaEquipamentos.map((equip, index) => {
                 let imageUrl;
                 if (equip.imagem_modelo_equipamento) {
                     imageUrl = `${BASE_URL}${equip.imagem_modelo_equipamento}`;
                 } else {
                     imageUrl = `${BASE_URL}/images/equipamento/noImg.png`;
                 }
                return (
                    <div key={index} className="row my-4 align-items-center">
                        <div className="col-4 col-sm-2">
                            <img
                                src={imageUrl}
                                alt={equip.nome_modelo_equipamento}
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-8 col-sm-5">
                            <p className='mb-0 font-weight-bold'>{equip.nome_marca_equipamento}</p>
                            <p className='mb-0 font-weight-bold'>{equip.nome_modelo_equipamento}</p>
                            {tipo_utilizador === 1 && (
                                <>
                                    <p className='mb-0'>Id: {equip.id_interno_equipamento}</p>
                                    <p>Núm. de Série: {equip.numero_serie_equipamento}</p>
                                </>
                            )}
                        </div>
                        <div className="col-8 col-sm-5">
                            {tipo_utilizador === 1 && (
                                <p><strong>Observações:</strong> {equip.observacoes_equipamento || 'N/A'}</p>
                            )}
                        </div>
                    </div>
                )
            })}
        </>
    );
}
