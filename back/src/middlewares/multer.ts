import multer from 'multer'
import path from 'path'
import MulterGoogleCloudStorage from 'multer-cloud-storage';

const config = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: new MulterGoogleCloudStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
}

export const upload = multer(config)