import PlayerModel from '../models/playersAccount';
import checkPositions from '../validations/positionValidation';

class SearchPlayersController {
  async index(request, response) {
    try {
      const {
        country, position: positions, startDate, endDate, heightInit, heightEnd,
      } = request.body;

      const data = await PlayerModel.find();

      const filteredData = data
        .filter((item) => {
          if (item.playerAge !== undefined || item.country !== undefined || item.playerHeight) {
            const age = item.playerAge.split('/');
            const playerAgeYear = age[2];

            const ageQueryInit = startDate.split('/');
            const queryAgeYearInit = ageQueryInit[2];

            const ageQueryEnd = endDate.split('/');
            const queryAgeYearEnd = ageQueryEnd[2];

            return checkPositions(item.position, positions) === true && item.country === country
            && playerAgeYear >= queryAgeYearInit && playerAgeYear <= queryAgeYearEnd
            && item.playerHeight >= parseFloat(heightInit).toFixed(2)
            && item.playerHeight <= parseFloat(heightEnd).toFixed(2);
          }
        });

      return response.status(200).json({ data: filteredData });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error });
    }
  }
}
export default new SearchPlayersController();
