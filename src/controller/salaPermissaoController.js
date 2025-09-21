import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as salaRepo from '../repository/salaRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();



endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {
    let salaId = req.params.sala
    let usuarioId = req.user.id
    let permissao = false;


    await salaPermissaoRepo.inserirPermissao(salaId,usuarioId,permissao)
    resp.send()
});


endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    const salaId = req.params.sala;
    const usuarioId = req.params.usuario;
    const usuarioLogadoId = req.user.id

    const donoSala = await salaPermissaoRepo.verificarPermissaoSala(salaId);

    if (Number(donoSala.usuario_id) !== Number(usuarioLogadoId)) {
      return resp.status(403).send('Somente o dono da sala pode aprovar um novo usuário.');
    }

    await salaPermissaoRepo.aprovarPermissao(salaId, usuarioId);
    return resp.status(200).send({ mensagem: 'Usuário aprovado com sucesso!' });


});




export default endpoints;