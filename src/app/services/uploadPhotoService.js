/* eslint-disable consistent-return */
import { unlink } from 'fs';
import bucket from '../../configs/firebase';

export default {
  async uploadFile(request) {
    if (request.file === undefined) {
      return request;
    }
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: request.file.filename,
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };

    await bucket.upload(request.file.path, {
      gzip: true,
      metadata,
    });

    const file = await Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(request.file.filename)}?alt=media&token=${request.file.filename}`);
    request.body = {
      ...request.body,
      profile: file,
      profile_path: request.file.filename,
    };
    console.log(request.body);
    unlink(request.file.path, () => {});
    return request;
  },
  async updateFile(req, res, next) {
    const { profilePath } = req.body;

    if (req.file === undefined) {
      return req;
    }
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: req.file.filename,
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };
    bucket.deleteFiles({
      prefix: profilePath,
    }, async (err) => {
      if (!err) {
        await bucket.upload(req.file.path, {
          gzip: true,
          metadata,
        });

        const file = await Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(req.file.filename)}?alt=media&token=${req.file.filename}`);
        req.body = {
          ...req.body,
          profile: file,
          profile_path: req.file.filename,
        };
        unlink(req.file.path, () => {});
        return req;
      }
    });
    return null;
  },
  async removeFile(req, res, next) {
    const { profilePath } = req.params;

    bucket.deleteFiles({
      prefix: profilePath,
    }, (err) => {
      if (!err) {
        return next();
      }
      return res.status(400).json({ data: 'Not found!' });
    });
  },
};
