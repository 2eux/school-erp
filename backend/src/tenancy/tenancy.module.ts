import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TenantConnectionService } from './tenant-connection.service';
import { TENANT_DATASOURCE } from './tenancy.constants';

@Global()
@Module({
  providers: [
    TenantConnectionService,
    {
      provide: TENANT_DATASOURCE,
      scope: Scope.REQUEST,
      inject: [REQUEST, TenantConnectionService],
      useFactory: async (req: any, tenantConn: TenantConnectionService) => {
        const schema = req.tenantSchema;
        if (!schema) {
          throw new Error(
            'Tenant context not available — ensure TenantMiddleware is applied to this route',
          );
        }
        return tenantConn.getTenantConnection(schema);
      },
    },
  ],
  exports: [TenantConnectionService, TENANT_DATASOURCE],
})
export class TenancyModule {}
