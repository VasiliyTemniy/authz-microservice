import { config } from './config';
import { HTTPServerFastify } from './server/http';
import { CLogger, CLoggerColored } from './utils/logger';

const ChosenCLogger = config.LOGGER.COLORED
  ? CLoggerColored
  : CLogger;

const httpServer = new HTTPServerFastify(
  new ChosenCLogger({ scope: 'http', level: config.LOGGER.LEVEL })
);

const bootstrap = async () => {
  await httpServer.listen({ port: config.PORT, host: '127.0.0.1' });
  await httpServer.init();
};

void bootstrap();