import models from '../models';

class PumpRepository {
    createPump(body) {
        return models.Pump.create({
            name: body.name
        });
    }

    findAllPumps() {
        return models.Pump.findAll();
    }

    findPumpById(id) {
        return models.Pump.findByPk(id);
    }

    getPlainPumpObject(data) {
        return data.get({
            plain: true
        });
    }

    updatePump(id, pump) {
        return models.Pump.update(
            pump,
            {
                where: {
                    id
                }
            }
        );
    }

    deletePump(pump) {
        return pump.destroy();
    }
}

export default new PumpRepository();