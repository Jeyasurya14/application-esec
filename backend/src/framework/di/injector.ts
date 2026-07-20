export const TOKENS = {
  // Database
  MYSQL_SERVICE: 'MySqlService',

  // Logger
  LOGGER_SERVICE: 'LoggerService',

  // Procedure Engine
  PROCEDURE_VALIDATOR: 'ProcedureValidator',
  PROCEDURE_EXECUTOR: 'ProcedureExecutor',
  PROCEDURE_SERVICE: 'ProcedureService',

  // Module Services
  PROCEDURE_MODULE_SERVICE: 'ProcedureModuleService',
  QUERY_MODULE_SERVICE: 'QueryModuleService',
  UPDATE_MODULE_SERVICE: 'UpdateModuleService',
  SCREEN_SERVICE: 'ScreenService',

  // Controllers
  PROCEDURE_CONTROLLER: 'ProcedureController',
  QUERY_CONTROLLER: 'QueryController',
  UPDATE_CONTROLLER: 'UpdateController',
  SCREEN_CONTROLLER: 'ScreenController',
} as const;
