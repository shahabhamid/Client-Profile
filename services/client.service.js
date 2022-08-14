const db = require('_helpers/db');

module.exports = {
    getClients,
    addClient,
    addClients,
    updateClient,
    getClientByID,
    deleteClient,
    deleteManyClients,
};


async function getClients() {
    return await db.Client.findAll({
        include: {
            model: db.Source,
            as: 'SourceID'
        }
    });
}

async function addClient(body) {
    return await db.Client.create(body);
}

async function addClients(body) {
    db.Client.bulkCreate(body, { ignoreDuplicates: true })
}
async function updateClient(id, body) {

    const client = await getClientByID(id);
    Object.assign(client, body);
    await client.save();
    return client.get()
}

async function deleteClient(id) {
    const client = await getClientByID(id);
    await client.destroy();
}

async function deleteManyClients(ids) {
    await db.Client.destroy({ where: { id: ids } })

}
// helper functions

async function getClientByID(id) {
    const Client = await db.Client.findByPk(id, {
        include: {
            model: db.Source,
            as: 'SourceID'
        }
    });
    if (!Client) throw 'Client not found';
    return Client;
}

