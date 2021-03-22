import VisualizationModel from '../models/vizualizations';

class VisualizationController {
  async index(request, response) {
    try {
      const { id } = request.params;
      const data = await VisualizationModel.findOne({ player: id });
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async store(request, response) {
    try {
      const data = await VisualizationModel(request.body).save();
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
export default new VisualizationController();
