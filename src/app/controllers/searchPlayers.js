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
          const age = item.playerAge.split('/');
          const playerAgeYear = age[2];

          const ageQueryInit = startDate.split('/');
          const queryAgeYearInit = ageQueryInit[2];

          const ageQueryEnd = endDate.split('/');
          const queryAgeYearEnd = ageQueryEnd[2];

          return checkPositions(item.position, positions) === true && item.country === country
          && playerAgeYear >= queryAgeYearInit && playerAgeYear <= queryAgeYearEnd
          && item.playerHeight >= heightInit && item.playerHeight <= heightEnd;
        });

      return response.status(200).json({ data: filteredData });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
export default new SearchPlayersController();
