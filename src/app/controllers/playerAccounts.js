import PlayerAccountModel from '../models/playersAccount';
import updalodPhoto from '../services/uploadPhotoService';

class PlayerAccountController {
  async index(request, response) {
    try {
      const data = await PlayerAccountModel.find().populate('account');
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const data = await PlayerAccountModel.findOne({ _id: id });

      if (!data) {
        return response.status(404).json({ error: 'player not found' });
      }

      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async store(request, response) {
    try {
      console.log(request.body);
      await updalodPhoto.uploadFile(request);
      const data = await PlayerAccountModel(request.body).save();

      return response.status(200).json({ data });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const playerExist = await PlayerAccountModel.findOne({ account: id });

      if (!playerExist) {
        return this.store();
      }

      await updalodPhoto.updateFile(request);

      const data = await PlayerAccountModel.findByIdAndUpdate({ _id: id }, request.body);
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async remove(request, response) {
    try {
      const { id } = request.params;
      const playerExist = await PlayerAccountModel.findById(id);

      if (!playerExist) {
        return response.status(404).json({ error: 'player not found' });
      }
      await PlayerAccountModel.findByIdAndDelete(id);
      return response.status(200).json({ data: 'deleted' });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
export default new PlayerAccountController();
