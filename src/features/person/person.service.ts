import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from '@prisma/client';

@Injectable()
export class PersonService {
    /**
     * PersonService Constructor
     * @param prismaService 
     */
    constructor(private readonly prismaService: PrismaService) {}
    /**
     * 
     * @param person 
     * @returns 
     */
    async createPersonAsync(person: CreatePersonDto): Promise<Person> {
        const {address, ...current } = person
        const data = { 
            ...current,
            Address: address
        }
        return  await this.prismaService.person.create({ data });
    }

    /**
     * 
     * @returns 
     */
    async getAllPersonAsync(): Promise<Person[]> {
       return await this.prismaService.person.findMany();
    }
    
    /**
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    async updatePersonAsync(id: number, data: CreatePersonDto) {
        const { address, fullName, phoneNumber } = data;
        return await this.prismaService.person.update({
            where: { id },
            data: {
                fullName,
                phoneNumber,
                Address: address
            }
        })
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    async remove(id: number) {
        return await this.prismaService.person.delete({ where: { id }});
    }

}
