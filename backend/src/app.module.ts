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
import { AuthModule } from './modules/tenanted/auth/auth.module';
import { PlatformAuthModule } from '~/platform/auth/platform-auth.module';
import { TenantMiddleware } from '~/tenancy/tenant.middleware';
import { MembershipModule } from '~/platform/memberships/membership.module';
import { UserModule } from '~/platform/users/user.module';
import { ProductModule } from '~/tenanted/products/product.module';
import { TenantModule } from '~/platform/tenants/tenant.module';

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
    PlatformAuthModule,
    UserModule,
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
    consumer
      .apply(TenantMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/info', method: RequestMethod.GET },
        { path: 'health', method: RequestMethod.ALL },
        { path: 'health/*path', method: RequestMethod.ALL },
        { path: 'tenants', method: RequestMethod.ALL },
        { path: 'tenants/*path', method: RequestMethod.ALL },
        { path: 'memberships', method: RequestMethod.ALL },
        { path: 'memberships/*path', method: RequestMethod.ALL },
        { path: 'platform/auth', method: RequestMethod.ALL },
        { path: 'platform/auth/*path', method: RequestMethod.ALL },
        { path: 'platform/users', method: RequestMethod.ALL },
        { path: 'platform/users/*path', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
