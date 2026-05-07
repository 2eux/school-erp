import { registerAs } from "@nestjs/config";

const appConfig = registerAs('app', () => ({
	host: process.env.HOST ?? 'localhost',
	port: parseInt(process.env.PORT ?? '5000', 10),
	environment: process.env.NODE_ENV ?? 'development',
	version: process.env.VERSION ?? '1.0.0',
	name: process.env.NAME ?? 'Multi-tenant SaaS Application',
	tenantHeaderName: process.env.TENANT_HEADER_NAME ?? 'x-tenant-id'
}));

export type AppConfig = ReturnType<typeof appConfig>;
export default appConfig;
