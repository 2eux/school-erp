import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../modules/public/tenants/services/tenant.service';
import { TenantStatus } from 'src/modules/public/tenants/enums/tenant-status.enum';
import { ConfigService } from '@nestjs/config';


export interface RequestWithTenant extends Request {
  tenantId?: string;
  tenantSchema?: string;
  tenantSlug?: string;
}


@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private tenantService: TenantService, 
    private configService: ConfigService,
  ) {}

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
    // Extract from header (X-Tenant-ID) - priority method
    const appConfig = this.configService.get('app');
    if (!appConfig?.tenantHeaderName) {
      throw new Error('Tenant header key is not configured');
    }
    const tenantSlug = req.headers[appConfig.tenantHeaderName.toLowerCase()] as string;
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
