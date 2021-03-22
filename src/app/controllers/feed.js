import VideoModel from '../models/playerVideos';

class FeedController {
  async index(request, response) {
    try {
      const { id } = request.params;
      const data = (await VideoModel.find({ userId: id }).populate('userId')).reverse();
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
export default new FeedController();
