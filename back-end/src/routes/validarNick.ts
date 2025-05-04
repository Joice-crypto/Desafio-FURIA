import axios from 'axios';
import { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
dotenv.config();



export async function validarNick(nick: string) {
    if (!nick || nick.length < 3) {
        throw new Error('Nick inválido.');
    }

    const faceitToken = process.env.FACEIT_API_KEY;
    if (!faceitToken) {
        throw new Error('Chave da API do Faceit não fornecida.');
    }

    try {
        const response = await axios.get(
            `https://open.faceit.com/data/v4/players?nickname=${nick}`,
            {
                headers: {
                    Authorization: `Bearer ${faceitToken}`,
                },
            }
        );

        const profile = response.data;

        return {
            link: `https://www.faceit.com/pt/players/${profile.nickname}`,
            nickname: profile.nickname,
            country: profile.country,
            games: profile.games,
            elo: profile.games?.cs2?.faceit_elo || 'Sem ELO CS2',
        };
    } catch (error: any) {
        console.error('Erro Faceit:', error.response?.data || error.message);
        throw new Error('Perfil não encontrado ou token inválido.');
    }
}
