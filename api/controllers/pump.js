import PumpValidator from '../validators/pump';
import ValidationService from '../services/validation';
import ValidationError from '../errors/validation';
import PumpService from '../services/pump';
import ResponseService from '../services/response';

class PumpController {
    create(req, res, next) {
        const result = ValidationService.validate(req.body, PumpValidator);
        if (! result) {
            PumpService.create(req.body)
            .then(response => {
                const message = 'The new pump, ' + response.name + ', was successfully created.';
                ResponseService.successful(res, response, message);
            })
            .catch(next);
        } else {
            throw new ValidationError(result);
        }
    }

    all(res, next) {
        PumpService.all()
        .then(response => {
            const message = 'All pumps have been returned successfully.';
            ResponseService.informational(res, response, message);
        })
        .catch(next);
    }

    one(req, res, next) {
        PumpService.one(req.params.id)
        .then(response => {
            const message = 'Successfully found Pump: ' + response.name + '.';
            ResponseService.informational(res, response, message);
        })
        .catch(next);
    }

    update(req, res, next) {
        const body = {
            name: req.body.name
        }
        const result = ValidationService.validate(body, PumpValidator);
        if (! result) {
            PumpService.update(req.params.id, req.body)
            .then(response => {
                const message = 'Successfully edited Pump: ' + response.name + '.';
                ResponseService.successful(res, response, message);
            })
            .catch(next);
        } else {
            throw new ValidationError(result);
        }
    }

    delete(req, res, next) {
        PumpService.delete(req.params.id)
        .then(response => {
            const message = 'Successfully deleted ' + response.name + '!';
            ResponseService.successful(res, response, message);
        })
        .catch(next);
    }
};

export default new PumpController();