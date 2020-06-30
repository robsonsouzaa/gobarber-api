import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // os dois pontos indicam a navegação nas pastas

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
