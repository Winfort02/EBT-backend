import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { SuccessHttpResponse } from 'src/models/success-response.model';
import { Person } from '@prisma/client';
import { ENDPOINT, HttpMessage } from 'src/constants';

@UseGuards(JwtAuthGuard)
@Controller(ENDPOINT.PERSON)
export class PersonController {
    /**
     * PersonController constructor
     * @param personService 
     */
    constructor(private readonly personService: PersonService) {}

    @Post()
    async create(@Body() createPersonDto: CreatePersonDto) {
        const person = await this.personService.createPersonAsync(createPersonDto);
        return new SuccessHttpResponse<Person>(person, HttpMessage.CREATED);
    }

    @Get()
    async getPersons() {
        const persons = await this.personService.getAllPersonAsync();
        return new SuccessHttpResponse<Person[]>(persons, HttpMessage.SUCCESS);
    }

    @Put(':id')
    async updatePerson(@Param('id') id: string, @Body() createPersonDto: CreatePersonDto) {
        const person = await this.personService.updatePersonAsync(+id, createPersonDto);
        return new SuccessHttpResponse<Person>(person, HttpMessage.UPDATED);
    }

    @Delete(':id')
    public async remove(@Param('id') id: string) {
        const person = await this.personService.remove(+id);
        return new SuccessHttpResponse<Person>(person, HttpMessage.DELETED);
    }
}
