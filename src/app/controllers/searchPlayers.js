import PlayerModel from '../models/playersAccount';

class SearchPlayersController {
  async index(request, response) {
    try {
      const {
        country, position, startDate, endDate,
      } = request.body;
      console.log(country, position, startDate, endDate);
      const data = await PlayerModel.find();
      const filteredData = data
        .filter((item) => item.position.includes(position) && item.country === country
          && item.playerAge >= startDate && item.playerAge <= endDate);

      return response.status(200).json({ data: filteredData });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
export default new SearchPlayersController();
