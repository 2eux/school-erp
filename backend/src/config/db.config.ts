import { registerAs } from "@nestjs/config";

const dbConfig = registerAs('db', () => ({
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT ?? '5432', 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	sync: process.env.DB_SYNC === 'true',
	logging: process.env.DB_LOGGING === 'true' ? ['query', 'error', 'schema'] : false,
}));

export type DbConfig = ReturnType<typeof dbConfig>;
export default dbConfig;
