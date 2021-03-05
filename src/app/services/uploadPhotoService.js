import { unlink } from 'fs';
import bucket from '../../configs/firebase';

export default {
  async uploadFile(req, res, next) {
    if (req.file === undefined) {
      return next();
    }
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: req.file.filename,
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };

    await bucket.upload(req.file.path, {
      gzip: true,
      metadata,
    });

    const file = await Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(req.file.filename)}?alt=media&token=${req.file.filename}`);
    req.body = {
      ...req.body,
      image_url: file,
      image_path: req.file.filename,
    };
    unlink(req.file.path, () => {});
    return next();
  },
  async updateFile(req, res, next) {
    const { imagePath } = req.body;

    if (req.file === undefined) {
      return next();
    }
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: req.file.filename,
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };
    bucket.deleteFiles({
      prefix: imagePath,
    }, async (err) => {
      if (!err) {
        await bucket.upload(req.file.path, {
          gzip: true,
          metadata,
        });

        const file = await Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(req.file.filename)}?alt=media&token=${req.file.filename}`);
        req.body = {
          ...req.body,
          image_url: file,
          image_path: req.file.filename,
        };
        unlink(req.file.path, () => {});
        next();
      }
    });
    return null;
  },
  async removeFile(req, res, next) {
    const { pathBuket } = req.params;

    bucket.deleteFiles({
      prefix: pathBuket,
    }, (err) => {
      if (!err) {
        return next();
      }
      return res.status(400).json({ data: 'Not found!' });
    });
  },
};
