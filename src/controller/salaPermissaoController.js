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

    let pedirPermisao = await salaPermissaoRepo.inserirPermissao(salaId,usuarioId,permissao)
    resp.send()
});


endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    let salaId = req.params.id
    let usuarioId = req.params.id
    let usualioLogadoId = req.user.id

    let permissao = await salaRepo.buscarSalaPorId(salaId)
});



export default endpoints;