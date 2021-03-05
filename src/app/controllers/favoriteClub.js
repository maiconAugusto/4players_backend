import FavoritesClubModel from '../models/favoriteClubs';

class FavoritesClubController {
  async index(request, response) {
    try {
      const data = await FavoritesClubModel.find();
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const data = await FavoritesClubModel.findById(id);

      if (!data) {
        return response.status(404).json({ error: 'not found' });
      }

      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400);
    }
  }

  async store(request, response) {
    try {
      const data = await FavoritesClubModel(request.body).save();
      return response.status(201).json({ data });
    } catch (error) {
      return response.status(400);
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const favoritesExist = await FavoritesClubModel.findById(id);

      if (favoritesExist) {
        return response.status(404).json({ error: 'not found' });
      }
      const data = await FavoritesClubModel.findByIdAndUpdate({ _id: id }, request.body);
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async remove(request, response) {
    try {
      const { id } = request.params;
      const favoritesExist = await FavoritesClubModel.findById(id);

      if (!favoritesExist) {
        return response.status(404).json({ error: 'not found' });
      }
      await FavoritesClubModel.findByIdAndDelete(id);
      return response.status(200).json({ data: 'deleted' });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
export default new FavoritesClubController();
