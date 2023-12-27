import { hash, genSalt } from 'bcryptjs';

interface IBcryptParams {
  salt?: string | number;
  source: string;
}

const generateSalt = (characterNumber = 10): Promise<string> => {
  return genSalt(characterNumber);
};

async function generateWithBcrypt({
  salt,
  source,
}: IBcryptParams): Promise<string> {
  salt = salt || (await generateSalt());

  return hash(source, salt);
}

export default { generateWithBcrypt };
