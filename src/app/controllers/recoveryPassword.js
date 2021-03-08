/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
import playerModel from '../models/account';
import _hash from '../../configs/generateHash';
import nodeMailer from '../../configs/mail';

class RecoveryPasswordController {
  async update(req, res) {
    try {
      const { email } = req.body;

      const playerAccount = await playerModel.findOne({ email });

      if (!playerAccount) {
        return res.status(404).json({ error: 'E-mail não encontrado' });
      }
      const hash = _hash.hash();
      const newPassword = await bcrypt.hash(hash, bcrypt.genSaltSync(8));
      await playerModel.updateOne({ _id: playerAccount._id }, { password: newPassword });

      (await nodeMailer).sendMail({
        from: '"4player" <noreplay@4player.com>',
        to: email,
        subject: 'Redefinação de senha ✔',
        template: 'recoveryPassword',
        context: {
          hash,
        },
      });
      return res.status(200).json({ data: 'Recuperação de senha solicitada com sucesso!' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
export default new RecoveryPasswordController();
