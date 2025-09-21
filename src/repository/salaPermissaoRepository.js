import { connection } from './connection.js';


export async function inserirPermissao(salaId, usuarioId, aprovado) {
    const comando = `
    INSERT INTO salaPermissao(sala_id, usuario_id, aprovado)
    VALUES
    (?, ?, ?);
    `

    let [info] = await connection.query(comando, [
        salaId,
        usuarioId,
        aprovado
    ])
    return info
}


export async function aprovarPermissao(salaId, usuarioId) {
    const comando = `
    UPDATE salaPermissao 
    SET aprovado = TRUE 
    WHERE sala_id = ? AND usuario_id = ?;
    `

    let [info] = await connection.query(comando,[
        salaId,
        usuarioId
    ])
    return info
}


export async function verificarPermissaoSala(salaId) {
    const comando = `
    SELECT usuario_id
    FROM sala
    WHERE id = ?;
    `

    let [info] = await connection.query(comando, [
        salaId,
    ])
    return info.length > 0 ? info[0] : null
}