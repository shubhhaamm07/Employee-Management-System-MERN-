import Board from "../models/Board.js";

export const createBoard = async (req, res) => {
  const board = await Board.create(req.body);
  res.json(board);
};

export const getBoards = async (req, res) => {
  const boards = await Board.findAll();
  res.json(boards);
};

export const deleteBoard = async (req, res) => {
  await Board.destroy({ where: { id: req.params.id } });
  res.json({ msg: "Deleted" });
};