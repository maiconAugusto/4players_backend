import ModelAccount from '../models/account';

class Account {
  async index(request, response) {
    try {
      const accounts = await ModelAccount.find({ active: true });
      return response.status(200).json({ accounts });
    } catch (error) {
      return response.status(400).json({ data: error });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const account = await ModelAccount.findById(id);
      if (!account) {
        return response.status(404).json({ error: 'account not found' });
      }
      return response.status(200).json({ data: account });
    } catch (error) {
      return response.status(400).json({ data: error });
    }
  }

  async store(request, response) {
    try {
      const account = await ModelAccount(request.body).save();
      return response.status(201).json({ data: account });
    } catch (error) {
      return response.status(400).json({ data: error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      const account = await ModelAccount.findOneAndUpdate({ _id: id }, request.body);
      if (!account) {
        return response.status(404).json({ error: 'account not found' });
      }
      return response.status(200).json({ data: account });
    } catch (error) {
      return response.status(400).json({ data: error });
    }
  }

  async remove(request, response) {
    try {
      const { id } = request.params;

      const account = await ModelAccount.findByIdAndDelete(id);
      if (!account) {
        return response.status(404).json({ error: 'account not found' });
      }
      return response.status(200).json({ data: 'removed' });
    } catch (error) {
      return response.status(400).json({ data: error });
    }
  }
}
export default new Account();
