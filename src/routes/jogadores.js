const routes = require('express').Router();

let jogadores = [
    { id: 1, name: 'Neymar Jr.', country: 'Brasil', team_name: 'Paris Saint-Germain', team_country: 'Paris', nascimento: "1992", bio: "Neymar da Silva Santos Júnior, mais conhecido como Neymar Jr. ou apenas Neymar, é um futebolista brasileiro que atua como atacante. Atualmente joga pelo Paris Saint-Germain e pela Seleção Brasileira. Revelado pelo Santos, em 2009, Neymar se tornou o principal futebolista em atividade no país." },
    { id: 2, name: 'Zlatan Ibrahimović', country: 'Suécia', team_name: 'Milan', team_country: 'Itália', nascimento: "1981", bio: "Zlatan Ibrahimović é um futebolista sueco que atua como atacante. Atualmente joga pelo Milan. Considerado um dos maiores atacantes do mundo no seu auge, tem como características o seu tamanho e força" },
    { id: 3, name: 'Cristiano Ronaldo', country:'Portugal', team_name: 'Juventus', team_country: 'Itália', nascimento: '5 de fevereiro de 1985', bio: 'Cristiano Ronaldo dos Santos Aveiro(Funchal, 5 de fevereiro de 1985) conhecido como Cristiano Ronaldo ou "CR7" (em referência ao número de sua camisa) é um futebolista português que atua como extremo-esquerdo ou ponta de lança. Atualmente joga pela Juventus e pela Seleção Portuguesa.'},
    { id: 4, name: 'Kaká', country: 'Brasil', team_name: 'Aposentado', team_country: 'Sem clube', nascimento: "1982", bio: "Ricardo Izecson dos Santos Leite, conhecido como Kaká ou Ricardo Kaká, é um jogador de futebol profissional aposentado que jogou como meia-atacante. Devido às suas atuações como craque no Milan, Kaká é amplamente considerado um dos melhores jogadores de sua geração." },
    { id: 5, name: 'Ronaldinho', country: 'Brasil', team_name: 'Aposentado', team_country: 'Sem clube', nascimento: "1980", bio: "Ronaldo de Assis Moreira, conhecido como Ronaldinho Gaúcho ou simplesmente Ronaldinho, é um ex-jogador de futebol profissional brasileiro e embaixador do Barcelona. Ele jogou principalmente como meia-atacante, mas também foi destacado como atacante ou ala." },
    { id: 6, name: 'Cássio Ramos', country: 'Brasil', team_name: 'Corinthians', team_country: 'Brasil', nascimento: "1987", bio: "Cássio Ramos, mais conhecido como Cássio (Veranópolis, 6 de junho de 1987), é um futebolista brasileiro que atua como goleiro. Atualmente defende o Corinthians." },
    { id: 7, name: 'Lionel Messi', country: 'Argentina', team_name: 'Barcelona', team_country: 'Espanha', nascimento: "1987", bio: "Lionel Andrés Messi Cuccittini, mais conhecido como Messi (Rosário, 24 de junho de 1987), é um futebolista argentino que atua como atacante. Atualmente joga pelo Barcelona e Seleção Argentina, onde é capitão por ambos." },
    { id: 8, name: 'Paulo Dybala', country: 'Argentina', team_name: 'Juventus', team_country: 'Itália', nascimento: "1993", bio: "Paulo Bruno Dybala (Laguna Larga, 15 de novembro de 1993) é um futebolista argentino que atua como atacante. Atualmente defende a Juventus e a Seleção Argentina." },
    { id: 9, name: 'Stephan El Shaarawy', country: 'Itália', team_name: 'Shanghai Shenhua', team_country: 'China', nascimento: "1992", bio: "Stephan Kareem El Shaarawy, em árabe ستيفان الشعراوي (Savona, 27 de outubro de 1992), é um futebolista italiano de origem egípcia que atua como atacante. Atualmente joga no Shanghai Shenhua." },
    { id: 10, name: 'Fagner', country: 'Brasil', team_name: 'Corinthians', team_country: 'Brasil', nascimento: "1989", bio: "Fagner Conserva Lemos, conhecido apenas como Fagner (São Paulo, 11 de junho de 1989), é um futebolista brasileiro que atua como lateral-direito. Atualmente joga pelo Corinthians." },
    { id: 11, name: 'Ronaldo Nazário', country: 'Brasil', team_name: 'Aposentado', team_country: 'Sem clube', nascimento: "1976", bio: "Ronaldo Luís Nazário de Lima, mais conhecido como Ronaldo ou Ronaldo Fenômeno (Rio de Janeiro, 22 de setembro de 1976), é um empresário e ex-futebolista brasileiro que atuava como atacante, amplamente reconhecido como um dos melhores futebolistas de todos os tempos. Atualmente é presidente do Valladolid, da Espanha." },
    { id: 12, name: 'Romário', country: 'Brasil', team_name: 'Aposentado', team_country: 'Sem clube', nascimento: "1966", bio: "Romário de Souza Faria, mais conhecido apenas como Romário (Rio de Janeiro, 29 de janeiro de 1966), é um ex-futebolista e, atualmente, político brasileiro. Em sua carreira no futebol, Romário atuava como atacante e é amplamente tido como um dos melhores jogadores de todos os tempos. Atualmente é Senador da República pelo Rio de Janeiro, filiado ao Podemos (PODE). Foi candidato a governador do Rio de Janeiro nas eleições de 2018." },
    { id: 13, name: 'Sergio Ramos', country: 'Espanha', team_name: 'Real Madrid', team_country: 'Espanha', nascimento: "1986", bio: "Sergio Ramos García, ou simplesmente Sergio Ramos (Sevilha, 30 de março de 1986) é um futebolista espanhol que atua como zagueiro. Atualmente joga pelo Real Madrid e pela Seleção Espanhola, onde é capitão por ambos. Ele é frequentemente considerado como o melhor zagueiro de sua geração e um dos melhores jogadores do século XXI." }

    


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