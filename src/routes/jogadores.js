const routes = require('express').Router();

let jogadores = [
    { id: 1, name: 'Neymar Jr.', country: 'Brasil', team_name: 'Paris Saint-Germain', team_country: 'Paris', nascimento: "1992", bio: "Neymar da Silva Santos Júnior, mais conhecido como Neymar Jr. ou apenas Neymar, é um futebolista brasileiro que atua como atacante. Atualmente joga pelo Paris Saint-Germain e pela Seleção Brasileira. Revelado pelo Santos, em 2009, Neymar se tornou o principal futebolista em atividade no país." },
    { id: 2, name: 'Zlatan Ibrahimović', country: 'Suécia', team_name: 'Milan', team_country: 'Itália', nascimento: "1981", bio: "Zlatan Ibrahimović é um futebolista sueco que atua como atacante. Atualmente joga pelo Milan. Considerado um dos maiores atacantes do mundo no seu auge, tem como características o seu tamanho e força" },
    { id:3 , name: 'Cristiano Ronaldo', country:'Portugal', team_name: 'Juventus', team_country: 'Itália', nascimento: '5 de fevereiro de 1985', bio: 'Cristiano Ronaldo dos Santos Aveiro(Funchal, 5 de fevereiro de 1985) conhecido como Cristiano Ronaldo ou "CR7" (em referência ao número de sua camisa) é um futebolista português que atua como extremo-esquerdo ou ponta de lança. Atualmente joga pela Juventus e pela Seleção Portuguesa.'}
]

routes.get('/', async (req, res, next) => {
    const formatedJogadores = jogadores.map((jogador) => {
        return { ...jogador, bio: undefined, nascimento: undefined }
    });

    res.status(200).send(formatedJogadores);
});

routes.get('/:id', async (req, res, next) => {
    const jogador = jogadores.find(jogador => jogador.id == req.params.id);

    if (!jogador) return res.status(404).send({ error: "Player not found" })

    res.status(200).send(jogador);
});

routes.post('/', async (req, res, next) => {
    const { id, name, country, bio, nascimento, team_name, team_country } = req.body;
    if (!name || !country || !bio || !nascimento || !team_name || !team_country) return res.status(400).send({ error: "Invalid form" });

    if (id) {
        jogadores = jogadores.filter(jogador => jogador.id !== id);
        jogadores. push(req.body);
        return res.status(200).send(req.body);
    }

    let lastId = 0;

    if (jogadores && jogadores.length > 0) {
        lastId = jogadores[jogadores.length - 1].id;
    }

    const jogador = { id: lastId+1, ...req.body };
    jogadores.push(jogador);

    res.status(200).send(jogador);
});

routes.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    jogadores = jogadores.filter(jogador => jogador.id !== id);
    res.status(200).send(jogadores);
});

module.exports = app => app.use('/players', routes);