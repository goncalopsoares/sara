import React from 'react';

export default function Comentarios({ comentarioProfessorRequisicao, comentarioSaraRequisicao, utilizadores, onSubmitComment, currentUser }) {

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
                            <div key={index} className="flex items-center mr-4 mb-4 mt-3">
                                <div className="flex items-center">
                                    <img className="rounded-full h-12 w-12 mr-1" src={`${BASE_URL}${user.avatar_utilizador}`} alt={user.nome_utilizador} />
                                </div>
                                <div className='mr-5'>
                                    <p className="mb-0">{comentarioProfessorRequisicao}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
            {comentarioSaraRequisicao ? (
                <div className='row'>
                    {utilizadores.map((user, index) => (
                        user.role_utilizador === 1 && index === 0 && (
                            <div key={index} className="flex items-center mr-4 mb-4 mt-3">
                                <div className="flex items-center">
                                    <img className="rounded-full h-12 w-12 mr-1" src={`${BASE_URL}${user.avatar_utilizador}`} alt={user.nome_utilizador} />
                                </div>
                                <div className='mr-5'>
                                    <p className="mb-0">{comentarioSaraRequisicao}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            ) : currentUser.tipo_utilizador === 1 ? (
                <>
                    <div className='row'>
                        <p>Sem comentários</p>
                        <p className='font-semibold'>Comenta</p>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <textarea
                                    className='form-textarea mt-1 block w-full'
                                    rows='3'
                                    placeholder='Escreva o seu comentário...'
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                            </div>
                            <div className='row mt-2'>
                                <button type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>
                                    Enviar Comentário
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            ) : <p>Sem Comentários</p>}
        </div>
    );
}