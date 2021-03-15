import ClubAccountsModel from '../models/clubsAccount';

class ClubAccountsController {
  async show(request, response) {
    try {
      const { id } = request.params;
      const data = await ClubAccountsModel.findOne({ account: id });
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
export default new ClubAccountsController();
