import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @Length(3, 50, { message: 'Name harus 3 sampai 50 karakter' })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  //   @MinLength(8, { message: 'Password minimal 8 karakter' })
  @MaxLength(32, { message: 'Password maksimal 32 karakter' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol',
    },
  )
  password: string;
}
