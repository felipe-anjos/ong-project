const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('incidents').count();
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body; 
        const ong_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id) //verifica se ID do tabela INCIDENTS é igual o ID varial que declaramos nesta função
        .select('ong_id') //seleciona o ong-id
        .first(); // como é só um valor, pega o primeiro valor

        if(incident.ong_id != ong_id){
            return reponse.status(401).json({error : 'Não atorizado'});// se se o valor da tabela for diferente da variavel, ele retorna Não autorizado
        }

        //se passou pelo if ele deleta o a incidents e devolve status 204
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();

    }
}