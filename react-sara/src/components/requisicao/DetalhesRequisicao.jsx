export default function DetalhesRequisicao({ detalhesRequisicao }) {
    console.log(detalhesRequisicao);

    const formatDate = (date) => {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
        };

        const dateString = new Date(date).toLocaleDateString("pt-PT", options);
        const [weekday, dateTime] = dateString.split(",");

        return `${dateTime.trim()}, ${weekday}`;
    };

    const sortedUsers = [...detalhesRequisicao.utilizador].sort(
        (a, b) => a.role_utilizador - b.role_utilizador
    );

    return (
        <>
            <div className="row">
                <div>
                    <h3 className="mt-3 mobile-subtitle">Nome da Requisição</h3>
                    <p>{detalhesRequisicao.nome_requisicao}</p>
                </div>
                <div>
                    <h3 className="mt-3 mobile-subtitle">
                        Contexto da Requisição
                    </h3>
                    <p>{detalhesRequisicao.contexto_requisicao}</p>
                </div>
                <div className="row my-4">
                    <div className="col-sm-6">
                        <h3 class="mobile-subtitle">Data de Recolha</h3>
                        <p>
                            {formatDate(
                                detalhesRequisicao.data_inicio_requisicao
                            )}
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <h3 class="mobile-subtitle">Data de Devolução</h3>
                        <p>
                            {formatDate(detalhesRequisicao.data_fim_requisicao)}
                        </p>
                    </div>
                </div>
                <div className="row my-4">
                    <h3 class="mobile-subtitle pb-3">Elementos do Grupo</h3>
                    <div className="flex flex-wrap mt-3">
                        {sortedUsers.map(
                            (user, index) =>
                                (user.role_utilizador === 3 ||
                                    user.role_utilizador === 4) && (
                                    <div
                                        key={index}
                                        className="flex items-center mr-4 my-2"
                                    >
                                        <div className="flex flex-col items-center mr-1 relative">
                                            {user.role_utilizador === 3 && (
                                                <p
                                                    className="text-white mb-1 background-green-500 rounded-full p-1 absolute"
                                                    style={{
                                                        fontSize: "0.75rem",
                                                        top: "-2rem",
                                                        left: "80%",
                                                        transform:
                                                            "translateX(-50%)",
                                                    }}
                                                >
                                                    Responsável
                                                </p>
                                            )}
                                            <img
                                                className="rounded-full h-12 w-12"
                                                src={`http://laravel.local:8080${user.avatar_utilizador}`}
                                                alt={user.nome_utilizador}
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-semibold mb-0">
                                                {user.nome_utilizador}
                                            </p>
                                            <p className="text-green-900 mb-0">
                                                {user.email_utilizador}
                                            </p>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col-12 col-sm-6 custom-spacing">
                        <h3 className="mobile-subtitle">Unidade Curricular</h3>
                        <div className="flex items-center mt-3">
                            <img
                                className="rounded-md h-12 w-12 mr-3"
                                src={`http://laravel.local:8080${detalhesRequisicao.icone_uc_contexto}`}
                                alt={detalhesRequisicao.nome_uc_contexto}
                            />
                            <p className="mb-0">
                                {detalhesRequisicao.nome_uc_contexto}
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 custom-spacing">
                        <h3 className="mobile-subtitle">
                            Validado pelo Professor
                        </h3>
                        {detalhesRequisicao.utilizador.map(
                            (user, index) =>
                                user.role_utilizador === 2 && (
                                    <div
                                        key={index}
                                        className="flex items-center mr-4 mb-4 mt-3"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                className="rounded-full h-12 w-12 mr-1"
                                                src={`http://laravel.local:8080${user.avatar_utilizador}`}
                                                alt={user.nome_utilizador}
                                            />
                                        </div>
                                        <div className="mr-5">
                                            <p className="font-semibold mb-0">
                                                {user.nome_utilizador}
                                            </p>
                                            <p className="text-blue-900 mb-0">
                                                {user.email_utilizador}
                                            </p>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
