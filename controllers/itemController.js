const Item = require('../models/itemModel');
const fs = require('fs-extra');

const logFilePath = './logs/logs.json';

async function logMetadata(data) {
  try {
    const logs = (await fs.readJson(logFilePath).catch(() => [])) || [];
    logs.push(data);
    await fs.writeJson(logFilePath, logs);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
}

exports.createItem = (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ message: 'Invalid data' });

  Item.create({ name, description }, async (err, result) => {
    if (err) return res.status(500).json({ error: err });

    await logMetadata({ action: 'CREATE', name, timestamp: new Date() });
    res.status(201).json({ message: 'Item created', id: result.insertId });
  });
};

exports.getAllItems = (req, res) => {
  Item.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getItemById = (req, res) => {
  const { id } = req.params;
  Item.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Item not found' });
    res.json(results[0]);
  });
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name || !description) return res.status(400).json({ message: 'Invalid data' });

  Item.update(id, { name, description }, async (err) => {
    if (err) return res.status(500).json({ error: err });

    await logMetadata({ action: 'UPDATE', id, name, timestamp: new Date() });
    res.json({ message: 'Item updated' });
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  Item.delete(id, async (err) => {
    if (err) return res.status(500).json({ error: err });

    await logMetadata({ action: 'DELETE', id, timestamp: new Date() });
    res.json({ message: 'Item deleted' });
  });
};
