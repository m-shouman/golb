import Environments from './environments'
import ConfigKeys from './configKeys'

const databases = {};
const databaseType = 'postgres';
const databaseDefaultPort = 5432;

databases[Environments.Development] = {};
databases[Environments.Testing] = {};
databases[Environments.Production] = {};

// set development config
databases[Environments.Development][ConfigKeys.databaseType] = databaseType;
databases[Environments.Development][ConfigKeys.databaseHost] = 'localhost';
databases[Environments.Development][ConfigKeys.databasePort] = databaseDefaultPort;
databases[Environments.Development][ConfigKeys.databaseUsername] = 'postgres';
databases[Environments.Development][ConfigKeys.databasePassword] = 'postgres';
databases[Environments.Development][ConfigKeys.databaseName] = 'golb_dev';

// set testing config
databases[Environments.Testing][ConfigKeys.databaseType] = databaseType;
databases[Environments.Testing][ConfigKeys.databaseHost] = 'localhost';
databases[Environments.Testing][ConfigKeys.databasePort] = process.env.DATABASE_PORT || databaseDefaultPort;
databases[Environments.Testing][ConfigKeys.databaseUsername] = process.env.DATABASE_USERNAME || 'postgres';
databases[Environments.Testing][ConfigKeys.databasePassword] = process.env.DATABASE_PASSWORD || 'postgres';
databases[Environments.Testing][ConfigKeys.databaseName] = 'golb_testing';

// set production config
databases[Environments.Production][ConfigKeys.databaseType] = databaseType;
databases[Environments.Production][ConfigKeys.databaseHost] = 'localhost';
databases[Environments.Production][ConfigKeys.databasePort] = process.env.DATABASE_PORT || databaseDefaultPort;
databases[Environments.Production][ConfigKeys.databaseUsername] = process.env.DATABASE_USERNAME || 'postgres';
databases[Environments.Production][ConfigKeys.databasePassword] = process.env.DATABASE_PASSWORD || 'postgres';
databases[Environments.Production][ConfigKeys.databaseName] = 'golb_production';

export default () => (databases[process.env.NODE_ENV]);