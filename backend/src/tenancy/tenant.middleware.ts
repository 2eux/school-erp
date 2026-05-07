import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Key } from '~/common/enums/keys.enum';
import { TenantStatus } from '~/platform/tenants/enums/tenant-status.enum';
import { TenantService } from '~/platform/tenants/services/tenant.service';

export interface RequestWithTenant extends Request {
  tenantId?: string;
  tenantSchema?: string;
  tenantSlug?: string;
}


@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private tenantService: TenantService) {}

  async use(req: RequestWithTenant, res: Response, next: NextFunction) {
    const slug = this.extractSlug(req);
    
    if (!slug) {
      throw new BadRequestException('Tenant slug is required');
    }

    const tenant = await this.tenantService.findBySlug(slug);
    
    if (!tenant || tenant.status !== TenantStatus.ACTIVE) {
      throw new BadRequestException('Invalid or inactive tenant');
    }

    req.tenantId = tenant.id;
    req.tenantSlug = tenant.slug;
    req.tenantSchema = tenant.schemaName;
    next();
  }

  private extractSlug(req: Request): string | null {
    // Extract from header (e.g. x-tenant-id) — priority method
    const tenantSlug = req.headers[Key.TenantKeyHeader.toLowerCase()] as string;
    if (tenantSlug) return tenantSlug;

    // Extract from domain
    const host = req.headers.host || '';
    const subdomain = host?.split('.')[0];
    
    if(!['www', 'api'].includes(subdomain)) {
      return subdomain;
    }

    return null;
  }
}
