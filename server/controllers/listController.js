import List from "../models/List.js";

export const createList = async (req, res) => {
  const list = await List.create(req.body);
  res.json(list);
};

export const getLists = async (req, res) => {
  const lists = await List.findAll({
    where: { boardId: req.params.boardId }
  });
  res.json(lists);
};

export const deleteList = async (req, res) => {
  await List.destroy({ where: { id: req.params.id } });
  res.json({ msg: "Deleted" });
};