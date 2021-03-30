/* eslint-disable consistent-return */
import { unlink, rename } from 'fs';
import bucket from '../../configs/firebase';
const fs = require('fs');

export default {
  async uploadFile(request) {
    if (request.file === undefined) {
      return request;
    }

    const path = request.file.filename.split('.')[0];

    fs.rename(request.file.path, `${path}.mp4`, () => {
    });


    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: `${path}.mp4`,
      },
      contentType: 'video/mp4',
      uploadType: 'media',
    };


    await bucket.upload(`${path}.mp4`, {
      gzip: true,
      metadata,
    });

    const file = await Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(`${path}.mp4`)}?alt=media&token=${path}.mp4`);
    request.body = {
      ...request.body,
      video: file,
      video_path: `${path}.mp4`,
    };

    unlink(`${path}.mp4`, () => {});
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
