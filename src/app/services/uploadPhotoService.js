/* eslint-disable consistent-return */
import { unlink } from 'fs';
import bucket from '../../configs/firebase';
var AWS = require('aws-sdk');


export default {
  async uploadFile(request, res, next) {
    request.body = {
      ...request.body,
      profile: request.file.location,
      profile_path: request.file.key,
    };

    return request;
  },
  async updateFile(req, res, next) {
    const { profilePath } = req.body;

    if (req.file === undefined) {
      return res;
    }

    if (profilePath === undefined || profilePath === '' || profilePath === null) {
      await this.uploadFile(req);
      return req;
    }

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: profilePath
    };

    const s3 = new AWS.S3();
    s3.deleteObject(params,()=>{});

    req.body = {
      ...req.body,
      profile: req.file.location,
      profile_path: req.file.key,
    };

    return req;
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
