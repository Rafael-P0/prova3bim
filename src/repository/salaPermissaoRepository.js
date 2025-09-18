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
}


export async function aprovarPermissao(salaId, usuarioId) {
    const comando = `
    UPDATE salaPermissao
    SET aprovado = true
    WHERE sala_id = ? and usuario_id = ?
    `

    let [info] = await connection.query(comando,[
        salaId,
        usuarioId
    ])
}


export async function verificarPermissaoSala(salaId, usuarioId) {
    const comando = `
    SELECT * FROM sala
    WHERE sala_id = ? and usuario_id = ?
    `

    let [info] = await connection.query(comando, [
        salaId,
        usuarioId
    ])
    return info
}