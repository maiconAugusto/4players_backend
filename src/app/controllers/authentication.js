import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AccountModel from '../models/account';

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
        return response.status(401).json({ data: 'Senha inválida' });
      }
      const { id } = account;
      account.password = undefined;

      return response.status(200).json({
        account,
        token: jwt.sign({ id }, process.env.HASH, { expiresIn: process.env.EXPIRESIN }),
      });
    } catch (error) {
      return response.status(404).json({ error });
    }
  }
}
export default new AuthenticationController();
