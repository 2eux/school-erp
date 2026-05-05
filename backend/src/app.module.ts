import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configLoaders, envValidationSchema } from './config';
import { CatModule } from './modules/tenanted/cats/cat.module';
import { HealthModule } from './shared/health/health.module';
import { TaskModule } from './modules/tenanted/tasks/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMasterDbConfig } from './database/database.config';
import { ProductModule } from './modules/tenanted/products/product.module';
import { MembershipModule } from './modules/public/memberships/membership.module';
import { AuthModule } from './modules/tenanted/auth/auth.module';
import { TenantMiddleware } from './tenancy/tenant.middleware';
import { TenantModule } from './modules/public/tenants/tenant.module';

const nodeEnv = process.env.NODE_ENV ?? 'development';
const envFilePath = ['.env', `.env.${nodeEnv}`];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: envValidationSchema,
      load: configLoaders,
    }),
    TypeOrmModule.forRoot(getMasterDbConfig()),
    HealthModule,
    TenantModule,
    AuthModule,
    CatModule,
    TaskModule,
    ProductModule,
    MembershipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware)
    .exclude(
      { path: '/', method: RequestMethod.GET },
      { path: '/info', method: RequestMethod.GET },
      { path: 'tenants', method: RequestMethod.ALL },
      { path: 'tenants/*path', method: RequestMethod.ALL },
      { path: 'health', method: 0 },
      { path: 'health/*path', method: 0 },
    )
    .forRoutes('*');
  }
}
