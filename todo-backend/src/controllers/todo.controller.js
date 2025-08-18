import Todo from '../models/todo.model.js';

export const getAll = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const todo = new Todo({ title: req.body.title });
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Not found' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, done: req.body.done },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
export const remove = async (req, res, next) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}