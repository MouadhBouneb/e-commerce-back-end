/* eslint-disable prettier/prettier */

import { diskStorage } from "multer";
import { extname } from "path";
import * as fs from 'fs';

export const storageArticle = diskStorage({
  destination: './uploads/articles',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

export const storageDocuments = diskStorage({
    destination: './uploads/documents',
    filename: (req, file, callback) => {
      callback(null, generateFilename(file));
    },
  });

function generateFilename(file) {
  return `${Date.now()}${extname(file.originalname)}`;
}

