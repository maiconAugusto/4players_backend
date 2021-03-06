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
      contentType: request.file.mimetype,
      uploadType: 'media',
    };

    await bucket.upload(request.file.path, {
      gzip: true,
      metadata,
    });

    const file = await Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(request.file.filename)}?alt=media&token=${request.file.filename}`);
    request.body = {
      ...request.body,
      video: file,
      video_path: request.file.filename,
    };

    unlink(request.file.path, () => {});
    return request;
  },
  async updateFile(request, res, next) {
    const { videoPath } = request.body;

    if (request.file === undefined) {
      return next();
    }
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: request.file.filename,
      },
      contentType: request.file.mimetype,
      uploadType: 'media',
    };
    bucket.deleteFiles({
      prefix: videoPath,
    }, async (err) => {
      if (!err) {
        await bucket.upload(request.file.path, {
          gzip: true,
          metadata,
        });

        const file = await Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(request.file.filename)}?alt=media&token=${request.file.filename}`);
        request.body = {
          ...request.body,
          video: file,
          video_path: request.file.filename,
        };
        unlink(request.file.path, () => {});
        return next();
      }
    });
    return null;
  },
  async removeFile(request, res, next) {
    const { videoPath } = request.body;

    bucket.deleteFiles({
      prefix: videoPath,
    }, (err) => {
      if (!err) {
        return next();
      }
      return res.status(400).json({ data: 'Not found!' });
    });
  },
};
