import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  swaggerDefinition: {
    info: {
      title: 'nexa',
      version: '1.0.0',
      description: 'API Documentation.',
    },
    securityDefinitions: {
      access: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      refresh: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    definitions: {
      '요청 시 필수값 설명': {
        type: 'object',
        properties: {
          'header.Authorization': {
            type: 'string',
            description:
              '`Bearer {문자열}.{문자열}.{문자열}` 의 형태. \nAccess token 과 refresh token은 같은 형태.',
          },
        },
      },
      '성공 시 응답 구조': {
        type: 'object',
        properties: {
          success: {
            type: 'string | boolean | null',
            description: '성공했으나 내용이 없을 때 메시지.',
          },
          '실제 데이터': {
            type: 'object | array | null',
            description: '응답 내용이 없을 경우 빈값.',
          },
        },
      },
      '실패 시 응답 구조': {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: '실패 시 내부적으로 사용하는 메시지.',
          },
          message: {
            type: 'string | null',
            description: '응답 내용을 사용자들에게 표시하여야할 때 내용.',
          },
        },
      },
    },
  },
  apis: [path.join(__dirname + '/../api/*')],
};

export const swaggerSpec = swaggerJSDoc(options);
