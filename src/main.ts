import { Logger } from '@nestjs/common';
import { initApplication } from './app';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await initApplication();

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  logger.log(`🚀 Server running on http://localhost:${PORT}`);
}

bootstrap();
