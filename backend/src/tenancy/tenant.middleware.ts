import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../modules/public/tenants/services/tenants.service';

export interface RequestWithTenant extends Request {
  tenantId?: string;
  tenantSchema?: string;
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private tenantService: TenantService) {}

  async use(req: RequestWithTenant, res: Response, next: NextFunction) {
    const subdomain = this.extractSubdomain(req);
    
    if (!subdomain) {
      throw new BadRequestException('Tenant subdomain is required');
    }

    const tenant = await this.tenantService.findBySubdomain(subdomain);
    
    if (!tenant || !tenant.isActive) {
      throw new BadRequestException('Invalid or inactive tenant');
    }

    req.tenantId = tenant.id;
    req.tenantSchema = tenant.schemaName;
    next();
  }

  private extractSubdomain(req: Request): string | null {
    // Extract from header (X-Tenant-ID) - priority method
    const tenantHeader = req.headers['x-tenant-id'] as string;
    if (tenantHeader) return tenantHeader;

    // Extract from subdomain
    const host = req.headers.host || '';
    const parts = host.split('.');
    
    // For localhost testing, you can use format: tenant.localhost:3000
    if (parts.length >= 2 && parts[0] !== 'www') {
      return parts[0];
    }

    return null;
  }
}
