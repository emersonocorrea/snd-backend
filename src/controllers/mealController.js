import { getMealsByType } from '../services/mealService.js';

export const getMealsByTypeController = async (req, res) => {
  const { type } = req.query;
  const meals = await getMealsByType(type);
  res.json(meals);
};