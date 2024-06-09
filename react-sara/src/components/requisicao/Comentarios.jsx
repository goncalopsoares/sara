import React from 'react';

export default function Comentarios({ comentarioProfessorRequisicao, comentarioSaraRequisicao, utilizadores, onSubmitComment, currentUser, comentarProfessor }) {

    const [newComment, setNewComment] = React.useState('');
    const BASE_URL = 'http://localhost:8000';

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitComment(newComment);
        setNewComment('');
    };

    console.log(currentUser)

    return (
        <div>
            {comentarioProfessorRequisicao && (
                <div className='row'>
                    {utilizadores.map((user, index) => (
                        user.role_utilizador === 2 && (
                            <div key={index} className="flex items-center mr-4 mb-4 mt-3 align-items-end">
                                <div className="flex items-center flex-shrink-0">
                                    <img className="rounded-full h-12 w-12 mr-3" src={`${BASE_URL}${user.avatar_utilizador}`} alt={user.nome_utilizador} />
                                </div>
                                <div className='mr-5 flex-grow'>
                                    <p className="mb-0 bg-blue-700 p-2 rounded-xl text-white">{comentarioProfessorRequisicao}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
            {comentarioSaraRequisicao && (
                <div className='row'>
                    {utilizadores.map((user, index) => (
                        user.role_utilizador === 1 && index === 0 && (
                            <div key={index} className="flex items-center mr-4 mb-4 mt-3">
                                <div className="flex items-center flex-shrink-0">
                                    <img className="rounded-full h-12 w-12 mr-3" src={`${BASE_URL}${user.avatar_utilizador}`} alt={user.nome_utilizador} />
                                </div>
                                <div className='mr-5 flex-grow'>
                                <p className="mb-0 bg-slate-950 p-2 rounded-xl text-white">{comentarioSaraRequisicao}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
            {currentUser.tipo_utilizador === 1 || comentarProfessor === true ? (
                <>
                    <div className='row'>
                        {comentarioProfessorRequisicao === null && comentarioSaraRequisicao === null ? (
                        <p>Sem comentários</p>) : null}
                        <p className='font-semibold'>Comenta</p>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <textarea
                                    className='form-textarea mt-1 block w-full'
                                    rows='3'
                                    placeholder='Escreve um comentário...'
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                            </div>
                            <div className='row mt-2'>
                                <button type='submit' className='bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                {comentarioProfessorRequisicao === null && comentarioSaraRequisicao === null ? (
                        <p className='mb-0'>Enviar Comentário</p>) : <p className='mb-0'>Editar comentário</p>}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            ) : null}
        </div>
    );
}