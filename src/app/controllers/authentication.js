/* eslint-disable no-unused-vars */
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AccountModel from '../models/account';
import PlayerAccount from '../models/playersAccount';
import ClubAccount from '../models/clubsAccount';

class AuthenticationController {
  async store(request, response) {
    try {
      const { email, password } = request.body;

      const account = await AccountModel.findOne({ email });
      if (!account) {
        return response.status(400).json({ error: 'Usuário não encontrado' });
      }

      if (account.active === false) {
        return response.status(401).json({ error: 'Está conta foi desativada!' });
      }

      const verifyPassword = await Bcrypt.compare(password, account.password);

      if (verifyPassword === false) {
        return response.status(401).json({ error: 'Senha inválida' });
      }
      const { _id } = account;
      account.password = undefined;

      const master = await PlayerAccount.findOne({ account: _id });
      const masterClub = await ClubAccount.findOne({ account: _id });

      return response.status(200).json({
        master: master == null ? masterClub : master,
        account,
        token: jwt.sign({ _id }, process.env.HASH, { expiresIn: process.env.EXPIRESIN }),
      });
    } catch (error) {
      return response.status(404).json({ error });
    }
  }
}
export default new AuthenticationController();
