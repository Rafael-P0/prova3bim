import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaRepo from '../repository/salaRepository.js';
import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/sala', autenticador, async (req, resp) => {
    let nome = req.body.nome
    let usualioLogadoId = req.user.id
    let permissao = true;

    let salaId = await salaRepo.inserirSala(nome, usualioLogadoId)
    await salaPermissaoRepo.inserirPermissao(salaId, usualioLogadoId, permissao)
    resp.send({novoId: salaId})
});


export default endpoints;