const db = require('_helpers/db');

module.exports = {
    getSources,
    getSourceByID,
    addSource,
    updateSource,
    deleteSource
};

async function getSources() {
    return await db.Source.findAll();
}

async function getSourceByID(id) {
    return await db.Source.findByPk(id);
}

async function addSource(body) {
    return await db.Source.create(body);
}

async function updateSource(id, body) {
    const source = await getSourcesByID(id);

    Object.assign(source, body);
    await source.save();

    return (source.get());
}

// Helper function

async function getSourcesByID(id) {
    const source = await db.Source.findByPk(id);
    if (!source) throw 'Sources not found ';
    return source;
}

async function deleteSource(id) {
    const source = await getSourcesByID(id);
    return await source.destroy();
}