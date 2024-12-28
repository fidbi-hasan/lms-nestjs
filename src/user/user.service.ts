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
      const { email, password } = createUserDto;
  
      // Check if the user already exists
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new BadRequestException({ message: 'Email already exists' });
      }
  
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with the hashed password
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
  
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
  // user.service.ts

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      select: ['id', 'firstName', 'lastName', 'email', 'username', 'specialization', 'courses'], // Exclude password field
    });

    if (!user) {
      throw new BadRequestException({ message: 'User not found' });
    }
    return user;
  }


  // update user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Check if password is being updated
    if (updateUserDto.password) {
      throw new BadRequestException('You need OTP verification to change your password');
    }

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

  async generateOtp(email: string): Promise<{ message: string }> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
  
    await this.userRepository.save(user);
    console.log(`Generated OTP for ${email}: ${otp}`); // Debug, replace with email service
    return { message: 'OTP generated and sent to your email' };
  }
  
  
  
  private async sendOtpEmail(email: string, otp: string): Promise<void> {
    // Integrate with an email service (e.g., SendGrid, Nodemailer)
    console.log(`Send OTP ${otp} to email: ${email}`);
  }

  async validateOtp(email: string, otp: string): Promise<{ message: string }> {
    const user = await this.findByEmail(email);
    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    return { message: 'OTP is valid' };
  }

  async changePassword(email: string, newPassword: string, otp: string): Promise<{ message: string }> {
    const user = await this.findByEmail(email);
    if (!user || user.otp !== otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }
  
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null; // Clear OTP after successful password change
    user.otpExpiry = null;
  
    await this.userRepository.save(user);
    return { message: 'Password changed successfully' };
  }
   
  
  
}
