import { createServer, Model } from 'miragejs';
import { EMPLOYEE_FIELD } from 'utils/constants';

export default function() {
  createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      server.create('employee', {
        [EMPLOYEE_FIELD.FIRST_NAME]: 'John Brown',
        [EMPLOYEE_FIELD.LAST_NAME]: 'Peter Grow',
        [EMPLOYEE_FIELD.EMAIL_ADDRESS]: 'peter@gmail.com',
        [EMPLOYEE_FIELD.PHONE_NUMBER]: '+6561234567',
        [EMPLOYEE_FIELD.GENDER]: 'Male',
      });
    },

    routes() {
      this.get('/api/employees', schema => schema.employees.all());

      this.get('/api/employees/:id', (schema, request) => {
        const { id } = request.params;

        return schema.employees.find(id);
      });

      this.post('/api/employees', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return schema.employees.create(attrs);
      });

      this.delete('/api/employees/:id', (schema, request) => {
        const { id } = request.params;

        return schema.employees.find(id).destroy();
      });

      this.put('/api/employees/:id', (schema, request) => {
        const { id } = request.params;
        const attrs = JSON.parse(request.requestBody);

        return schema.employees.find(id).update(attrs);
      });
    },
  });
}
