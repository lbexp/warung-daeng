import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODE } from 'src/constants';

export default function generateHttpException(
  errorCode: string,
): HttpException {
  switch (errorCode) {
    case ERROR_CODE[400]:
      return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    case ERROR_CODE[404]:
      return new HttpException('Not found', HttpStatus.NOT_FOUND);
    case ERROR_CODE[401]:
      return new HttpException('Not found', HttpStatus.UNAUTHORIZED);
    default:
      return new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}
