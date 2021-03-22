import VisualizationModel from '../models/vizualizations';

class VisualizationController {
  async index(request, response) {
    try {
      const { id } = request.params;
      const data = await VisualizationModel.count({ player: id });
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async store(request, response) {
    try {
      const verifyVisualization = await VisualizationModel.findOne({ club: request.body.club });

      if (verifyVisualization) {
        return response.status(400).json({ error: 'exist' });
      }

      const data = await VisualizationModel(request.body).save();
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
export default new VisualizationController();
