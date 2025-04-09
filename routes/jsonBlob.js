const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/blobs.json');

function loadData() {
  if (!fs.existsSync(dataPath)) return {};
  return JSON.parse(fs.readFileSync(dataPath));
}

function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

router.post('/', (req, res) => {
  const id = uuidv4();
  const blobs = loadData();
  blobs[id] = req.body;
  saveData(blobs);
  res.status(201).location(`/api/jsonBlob/${id}`).json({ id });
});

router.get('/:id', (req, res) => {
  const blobs = loadData();
  const blob = blobs[req.params.id];
  if (!blob) return res.status(404).json({ error: 'Not found' });
  res.json(blob);
});

router.put('/:id', (req, res) => {
  const blobs = loadData();
  if (!blobs[req.params.id]) return res.status(404).json({ error: 'Not found' });
  blobs[req.params.id] = req.body;
  saveData(blobs);
  res.json({ message: 'Updated' });
});

router.delete('/:id', (req, res) => {
  const blobs = loadData();
  if (!blobs[req.params.id]) return res.status(404).json({ error: 'Not found' });
  delete blobs[req.params.id];
  saveData(blobs);
  res.json({ message: 'Deleted' });
});

module.exports = router;
