import dotenv from 'dotenv';
dotenv.config();

import { themeFromSourceColor } from '@material/material-color-utilities';
import express from 'express';
import { unlink } from 'fs/promises';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

import { themeFromImagePath } from './material-color-utilities.js';
import { convertSchemesToCss } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'temp'),
  filename: (_req, file, cb) => {
    const uuid = uuidv4();
    cb(null, `${uuid}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const upload = multer({ storage });

const PORT = process.env.PORT || 3500;

async function main() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get('/', async (req, res) => {
    const theme = await themeFromImagePath(
      path.join(__dirname, '..', 'temp', 'temp.jpg'),
    );

    res.json(theme);
  });

  app.post('/image', upload.single('image'), async (req, res) => {
    const { file } = req;

    if (!file) {
      res.status(400).json({ message: 'field image is required' });
      return;
    }

    const theme = await themeFromImagePath(file.path).finally(() =>
      unlink(file.path),
    );

    res.json({
      themeSource: theme.source,
      themeStyle: convertSchemesToCss(theme.schemes),
    });
  });

  app.post('/source', async (req, res) => {
    const { source } = req.body;

    if (typeof source !== 'number') {
      res.status(400).json({ message: 'field source is required' });
      return;
    }

    const theme = await themeFromSourceColor(Number(source));

    res.json({
      themeSource: theme.source,
      themeStyle: convertSchemesToCss(theme.schemes),
    });
  });

  app.listen(PORT, () =>
    console.log(`Server listen on http://localhost:${PORT}`),
  );
}

main();
