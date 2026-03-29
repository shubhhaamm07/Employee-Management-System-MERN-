import Card from "../models/Card.js";

export const createCard = async (req, res) => {
  const { title, listId } = req.body;

  if (!title || !listId) {
    return res.status(400).json({ error: "Title and listId required" });
  }

  try {
    const card = await Card.create({ title, listId });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getCards = async (req, res) => {
  const cards = await Card.findAll({
    where: { listId: req.params.listId }
  });
  res.json(cards);
};

export const moveCard = async (req, res) => {
  const { cardId, listId } = req.body;

  await Card.update(
    { listId },
    { where: { id: cardId } }
  );

  res.json({ msg: "Moved" });
};

export const deleteCard = async (req, res) => {
  await Card.destroy({ where: { id: req.params.id } });
  res.json({ msg: "Deleted" });
};

export const updateCard = async (req, res) => {
  const { id, title } = req.body;

  await Card.update(
    { title },
    { where: { id } }
  );

  res.json({ msg: "Updated" });
};