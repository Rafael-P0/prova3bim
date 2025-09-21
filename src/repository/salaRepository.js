import { connection } from './connection.js';


export async function inserirSala(nome, usuarioId) {
    const comando = `
    INSERT INTO sala(nome, usuario_id)
    VALUES
    (?, ? );
    `

    const [info] = await connection.query(comando,[
        nome,
        usuarioId
    ])
    return info.insertId

}


export async function buscarSalaPorId(salaId) {
   const comando = `
   SELECT * FROM sala
   WHERE id = ?
   `

   let [info] = await connection.query(comando, [
    salaId
   ])
   return info[0]
}

