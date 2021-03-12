import Bcrypt from 'bcrypt';
import AccountModel from '../models/account';

class Account {
  async index(request, response) {
    try {
      const accounts = await AccountModel.find({ active: true });
      return response.status(200).json({ accounts });
    } catch (error) {
      return response.status(400).json({ data: error });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const account = await AccountModel.findById(id);
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
      const existAccount = await AccountModel.findOne({ email: request.body.email });
      if (existAccount) {
        return response.status(401).json({ error: 'Este e-mail já está sendo usado por um conta!' });
      }
      request.body.password = await Bcrypt.hash(request.body.password, Bcrypt.genSaltSync(8));

      const account = await AccountModel(request.body).save();
      return response.status(201).json({ data: account });
    } catch (error) {
      return response.status(400).json({ data: error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      const account = await AccountModel.findOneAndUpdate({ _id: id }, request.body);
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

      const account = await AccountModel.findByIdAndDelete(id);
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
