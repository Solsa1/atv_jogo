
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});


const Game = sequelize.define('Game', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plataforma: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});


sequelize.sync();


const app = express();
app.use(express.json());


app.post('/games', async (req, res) => {
  try {
    const { nome, genero, plataforma, preco } = req.body;
    const game = await Game.create({ nome, genero, plataforma, preco });
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/games', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findByPk(id);
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, genero, plataforma, preco } = req.body;
    const game = await Game.findByPk(id);
    if (game) {
      await game.update({ nome, genero, plataforma, preco });
      res.json(game);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.delete('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findByPk(id);
    if (game) {
      await game.destroy();
      res.json({ message: 'Game deleted successfully' });
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 