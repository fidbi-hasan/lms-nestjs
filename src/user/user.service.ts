import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // create
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email } = createUserDto;
  
      const existingUser = await this.userRepository.findOne({ where: { email } });
  
      if (existingUser) {
        throw new BadRequestException({ message: 'Email already exists' });
      }
  
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Error creating user');
    }
  }
  
  

  // validate user
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare passwords
    return isPasswordValid ? user : null;
  }

  // read all user
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // read single user
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where: {id}})

    if(!user) {
      throw new BadRequestException({message: 'user not found'});
    }
    return user;
  }

  // update user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    const updateUser = this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(updateUser);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }

  // Add findByEmail method
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
