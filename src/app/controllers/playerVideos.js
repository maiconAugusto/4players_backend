import VideoModel from '../models/playerVideos';
import videoServices from '../services/uploadVideoServices';

class VideosController {
  async index(request, response) {
    try {
      const data = await VideoModel.find().populate('account');
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const data = await VideoModel.findOne({ _id: id });

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
      await videoServices.uploadFile(request);
      const data = await VideoModel(request.body).save();

      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const playerExist = await VideoModel.findById(id);

      if (!playerExist) {
        return response.status(404).json({ error: 'player not found' });
      }
      const data = await VideoModel.findByIdAndUpdate({ _id: id }, request.body);
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async remove(request, response) {
    try {
      const { id } = request.params;
      const playerExist = await VideoModel.findById(id);

      if (!playerExist) {
        return response.status(404).json({ error: 'player not found' });
      }
      await VideoModel.findByIdAndDelete(id);
      return response.status(200).json({ data: 'deleted' });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
export default new VideosController();
