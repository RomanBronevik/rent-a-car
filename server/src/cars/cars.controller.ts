import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { AddExpensesDto } from './dto/add-expenses.dto';
import { Rent } from 'src/rent/entities/rent.entity';
import { CarExpense } from './entities/car-expense.entity';
import { Car } from './entities/car.entity';
import { CarModel } from './entities/car-model.entity';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  // get all cars
  @Get()
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  // get all car models
  @Get('models')
  findAllModels(): Promise<CarModel[]> {
    return this.carsService.findAllModels();
  }

  // get car model with given id DONE
  @Get('models/:id')
  findModel(@Param('id') id: string) {
    return this.carsService.findModel(id);
  }

  @Get('available')
  findAvailableCars() {
    return this.carsService.findAvailableCars();
  }

  /**
   * details for selected car with :id + sum of all expenses +
   * list of all clients that have rented a selected car
   *
   *  */

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Car> {
    return this.carsService.findOne(id);
  }

  // create new car
  @Post()
  createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.createCar(createCarDto);
  }

  // rent a car e.g.POST /cars/rent/115123/120
  @Get('rent/:carId/:clientId')
  rentACar(
    @Param('carId') carId: number,
    @Param('clientId') clientId: number,
  ): Promise<Rent> {
    return this.carsService.rentACar({ carId, clientId });
  }

  // add expenses for car
  @Post('expenses/:carId')
  addExpenses(
    @Body() addExpensesDto: AddExpensesDto,
    @Param('carId') carId: number,
  ): Promise<CarExpense> {
    const { description, price } = addExpensesDto;
    return this.carsService.addCarExpenses({ description, price, carId });
  }
}
