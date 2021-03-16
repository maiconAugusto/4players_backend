import PlayerAccountModel from '../models/playersAccount';
import updalodPhoto from '../services/uploadPhotoService';

class PlayerAccountByClubController {
  async store(request, response) {
    try {
      await updalodPhoto.uploadFile(request);
      const data = await PlayerAccountModel(request.body).save();
      console.log(request.body);
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
export default new PlayerAccountByClubController();
