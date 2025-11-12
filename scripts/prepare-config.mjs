import { access, constants, copyFile, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const templatePath = path.join(publicDir, 'config.template.json');
const configPath = path.join(publicDir, 'config.json');

const fileExists = async targetPath => {
  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const loadConfig = async targetPath => {
  const content = await readFile(targetPath, 'utf8');
  try {
    return JSON.parse(content);
  } catch (error) {
    console.warn('Runtime config is not valid JSON. Replacing with a fresh template.');
    return null;
  }
};

const writeConfig = async (data) => {
  const serialized = `${JSON.stringify(data, null, 2)}\n`;
  await writeFile(configPath, serialized, 'utf8');
};

const ensureConfigFile = async () => {
  const templateExists = await fileExists(templatePath);
  if (!templateExists) {
    console.warn('config.template.json is missing; skipping runtime config preparation.');
    return;
  }

  const configExists = await fileExists(configPath);
  if (!configExists) {
    await copyFile(templatePath, configPath);
  }

  const envKey = process.env.VITE_GOOGLE_API_KEY?.trim();
  if (!envKey) {
    return;
  }

  const currentConfig = (await fileExists(configPath)) ? await loadConfig(configPath) : null;
  const safeConfig = currentConfig && typeof currentConfig === 'object' ? currentConfig : {};
  if (safeConfig.googleApiKey === envKey) {
    return;
  }

  await writeConfig({
    ...safeConfig,
    googleApiKey: envKey,
  });
};

ensureConfigFile().catch(error => {
  console.error('Failed to prepare runtime config:', error);
  process.exit(1);
});
