import FavoritesPlayerModel from '../models/favoritePlayers';

class FavoritesPlayerController {
  async index(request, response) {
    try {
      const { id } = request.params;
      const data = await FavoritesPlayerModel.find({ account: id }).populate('player');
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const data = await FavoritesPlayerModel.findById(id).populate(['player']);

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
      const alreadyAdded = await FavoritesPlayerModel.findOne({ club: request.body.player });

      if (alreadyAdded) {
        return response.status(400).json({ error: 'Você já o adicionou como favorito!' });
      }

      const data = await FavoritesPlayerModel(request.body).save();
      return response.status(201).json({ data });
    } catch (error) {
      return response.status(400);
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const favoritesExist = await FavoritesPlayerModel.findById(id);

      if (favoritesExist) {
        return response.status(404).json({ error: 'not found' });
      }
      const data = await FavoritesPlayerModel.findByIdAndUpdate({ _id: id }, request.body);
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async remove(request, response) {
    try {
      const { id } = request.params;
      const favoritesExist = await FavoritesPlayerModel.findById(id);

      if (!favoritesExist) {
        return response.status(404).json({ error: 'not found' });
      }
      await FavoritesPlayerModel.findByIdAndDelete(id);
      return response.status(200).json({ data: 'deleted' });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
export default new FavoritesPlayerController();
