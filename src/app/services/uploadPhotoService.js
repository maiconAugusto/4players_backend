/* eslint-disable consistent-return */
import { unlink } from 'fs';
import bucket from '../../configs/firebase';
import S3 from 'aws-s3';


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

  //   const config = {
  //     dirName: '',
  //     bucketName: process.env.BUCKET_NAME,
  //     region: process.env.AWS_DEFAULT_REGION,
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // }

  // const S3Client = new S3(config);

  // S3Client
  //   .deleteFile('9e033acb01b6401100dec5b91be2521a-image_picker8340824595390511290.jpg')
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));

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
