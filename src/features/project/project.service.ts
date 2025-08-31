import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import moment from 'moment';
import { Prisma, Project } from '@prisma/client';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryParams } from 'src/models/query-params.model';
import { Pagination } from 'src/models/pagination.model';

@Injectable()
export class ProjectService {

    constructor(private readonly prismaService: PrismaService) {}

    public toIsoDate(date: string | Date) {
        return moment(date, 'YYYY-MM-DD').toDate();
    }

    /**
     * Method to generate transaction number base on current date
     * @returns 
     */
    async createTransactionNumberAsync(prisma: Prisma.TransactionClient) {
        const today = moment();
        const dateFormatted = today.format('YYYYMMDD');
        const prefix = `T${dateFormatted}`;
        const start = today.clone().startOf('day').toDate();
        const end = today.clone().endOf('day').toDate();

        const counter = await prisma.project.count({
            where: {
                createdAt: {
                    gte: start,
                    lte: end
                }
            }
        });

        const nextCounter = counter + 1;
        const construct = nextCounter.toString().padStart(5, '0');
        return `${prefix}${construct}`;
    }

    /**
     * Method to create project
     * @param data 
     * @returns 
     */
    async createAsync(data: CreateProjectDto) {
        return await this.prismaService.$transaction( async (transaction) => {
            const transactionNo = await this.createTransactionNumberAsync(transaction);
            const params = {
                ...data,
                transactionNo
            }
            return await transaction.project.create({ data: params });
        });
    }

    /**
     * Method to update the current project details
     * @param data 
     */
    async updateAsync(data: UpdateProjectDto, id: number) {
        return await this.prismaService.project.update({
            where: { id }, data
        });
    }

    /**
     * Method to get all projects
     * @returns 
     */
    async getProjects(param: QueryParams) {
        const skip = (param.page - 1) * param.limit;
        const whereClaus = {
            ...(param.search && {
                project: { contains: param.search, mode: 'insensitive'},
                client: { contains: param.search, mode: 'insensitive'}
            }),
            ...(param.start && {
                createdAt: {
                    gte: this.toIsoDate(param.start)
                }
            }),
            ...(param.end && {
                createdAt: {
                    ...(param.start ? { gte: this.toIsoDate(param.start) }: {}),
                    lte: this.toIsoDate(param.end)
                }
            })
        }
        const [data, total] = await this.prismaService.$transaction([
            this.prismaService.project.findMany({
                where: whereClaus,
                skip,
                take: param.limit,
                orderBy: { createdAt: 'desc'},
                include: {
                    worker: { include: { person: true }},
                    equipement: true
                }
            }),
            this.prismaService.project.count({ where: whereClaus })
        ]);
        const meta = {
            total,
            page: param.page,
            limit: param.limit,
            pages: Math.ceil(total / param.limit),
            prev: param.page > 1 ? param.page - 1 : null,
            next: param.page < total ? param.page + 1 : null
        }
        return new Pagination<Project>(data, meta, "projects");
    }



}
