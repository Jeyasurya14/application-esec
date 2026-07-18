import { Container, TOKENS } from './framework/di';
import { MySqlService } from './framework/database';
import { LoggerService } from './framework/logger';
import { ProcedureValidator } from './framework/procedure/validator/procedure.validator';
import { ProcedureParser } from './framework/procedure/parser/procedure.parser';
import { ProcedureExecutor } from './framework/procedure/executor/procedure.executor';
import { ProcedureService } from './framework/procedure/service/procedure.service';
import { ProcedureModuleService } from './modules/procedure/service/procedure.service';
import { QueryModuleService } from './modules/query/service/query.service';
import { UpdateModuleService } from './modules/update/service/update.service';
import { ScreenService } from './modules/screen/service/screen.service';
import { ProcedureController } from './modules/procedure/controller/procedure.controller';
import { QueryController } from './modules/query/controller/query.controller';
import { UpdateController } from './modules/update/controller/update.controller';
import { ScreenController } from './modules/screen/controller/screen.controller';

function configureContainer(): Container {
  const container = new Container();

  // Database
  container.registerSingleton(TOKENS.MYSQL_SERVICE, () => new MySqlService());

  // Logger
  container.registerSingleton(TOKENS.LOGGER_SERVICE, () => new LoggerService());

  // Procedure Engine
  container.register(TOKENS.PROCEDURE_VALIDATOR, () => new ProcedureValidator());
  container.register(TOKENS.PROCEDURE_PARSER, () => new ProcedureParser());
  container.register(
    TOKENS.PROCEDURE_EXECUTOR,
    () =>
      new ProcedureExecutor(
        container.resolve<MySqlService>(TOKENS.MYSQL_SERVICE),
        container.resolve<ProcedureValidator>(TOKENS.PROCEDURE_VALIDATOR),
        container.resolve<ProcedureParser>(TOKENS.PROCEDURE_PARSER),
      ),
  );
  container.register(
    TOKENS.PROCEDURE_SERVICE,
    () =>
      new ProcedureService(
        container.resolve<ProcedureExecutor>(TOKENS.PROCEDURE_EXECUTOR),
        container.resolve<LoggerService>(TOKENS.LOGGER_SERVICE),
      ),
  );

  // Module Services
  container.register(
    TOKENS.PROCEDURE_MODULE_SERVICE,
    () => new ProcedureModuleService(container.resolve<ProcedureService>(TOKENS.PROCEDURE_SERVICE)),
  );
  container.register(
    TOKENS.QUERY_MODULE_SERVICE,
    () => new QueryModuleService(container.resolve<ProcedureService>(TOKENS.PROCEDURE_SERVICE)),
  );
  container.register(
    TOKENS.UPDATE_MODULE_SERVICE,
    () => new UpdateModuleService(container.resolve<ProcedureService>(TOKENS.PROCEDURE_SERVICE)),
  );
  container.register(
    TOKENS.SCREEN_SERVICE,
    () => new ScreenService(container.resolve<MySqlService>(TOKENS.MYSQL_SERVICE)),
  );

  // Controllers
  container.register(
    TOKENS.PROCEDURE_CONTROLLER,
    () =>
      new ProcedureController(
        container.resolve<ProcedureModuleService>(TOKENS.PROCEDURE_MODULE_SERVICE),
      ),
  );
  container.register(
    TOKENS.QUERY_CONTROLLER,
    () => new QueryController(container.resolve<QueryModuleService>(TOKENS.QUERY_MODULE_SERVICE)),
  );
  container.register(
    TOKENS.UPDATE_CONTROLLER,
    () =>
      new UpdateController(container.resolve<UpdateModuleService>(TOKENS.UPDATE_MODULE_SERVICE)),
  );
  container.register(
    TOKENS.SCREEN_CONTROLLER,
    () => new ScreenController(container.resolve<ScreenService>(TOKENS.SCREEN_SERVICE)),
  );

  return container;
}

const container = configureContainer();
Container.setInstance(container);

export { container };
