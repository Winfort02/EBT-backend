import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ENDPOINT, HttpMessage } from 'src/constants';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProjectService } from './project.service';
import { QueryParams } from 'src/models/query-params.model';
import { SuccessHttpResponse } from 'src/models/success-response.model';
import { Pagination } from 'src/models/pagination.model';
import { Project } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller(ENDPOINT.PROJECT)
export class ProjectController {

    constructor(private readonly projectService: ProjectService) {}

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async getProjectList(@Query() queryParams: QueryParams) {
        const data = await this.projectService.getProjects(queryParams);
        return new SuccessHttpResponse<Pagination<Project>>(data, HttpMessage.SUCCESS);
    }
}
