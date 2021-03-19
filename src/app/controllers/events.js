import EventModel from '../models/playerVideos';

class EventController {
  async index(request, response) {
    try {
      const data = await EventModel.find({ }).populate('account');
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const data = await EventModel.findOne({ _id: id });

      if (!data) {
        return response.status(404).json({ error: 'event not found' });
      }

      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async store(request, response) {
    try {
      const data = await EventModel(request.body).save();

      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const playerExist = await EventModel.findById(id);

      if (!playerExist) {
        return response.status(404).json({ error: 'event not found' });
      }

      await EventModel.updateFile(request);

      const data = await EventModel.findByIdAndUpdate({ _id: id }, request.body);
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async remove(request, response) {
    try {
      const { id } = request.params;

      const playerExist = await EventModel.findById(id);

      if (!playerExist) {
        return response.status(404).json({ error: 'event not found' });
      }

      await EventModel.findByIdAndDelete(id);
      return response.status(200).json({ data: 'deleted' });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
export default new EventController();
