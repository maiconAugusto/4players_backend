import ClubAccountsModel from '../models/clubsAccount';
import updalodPhoto from '../services/uploadPhotoService';

class ClubAccountsController {
  async index(request, response) {
    try {
      const data = await ClubAccountsModel.find();
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async show(request, response) {
    try {
      const data = await ClubAccountsModel.findOne();
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async store(request, response) {
    try {
      await updalodPhoto.uploadFile(request);
      const data = await ClubAccountsModel(request.body).save();
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const clubExist = await ClubAccountsModel.findOneAndUpdate({ account: id });

      if (!clubExist) {
        await updalodPhoto.uploadFile(request);
        const data = await ClubAccountsModel(request.body).save();
        return response.status(200).json({ data });
      }
      await updalodPhoto.updateFile(request);

      const data = await ClubAccountsModel.findOneAndUpdate({ account: id }, request.body);
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async remove(request, response) {
    try {
      const { id } = request.params;
      const clubExist = await ClubAccountsModel.findById(id);

      if (!clubExist) {
        return response.status(404).json({ error: 'not found' });
      }
      await ClubAccountsModel.findByIdAndDelete(id);
      return response.status(200).json({ data: 'deleted' });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
export default new ClubAccountsController();
