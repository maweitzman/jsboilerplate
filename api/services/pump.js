import PumpRepository from '../repositories/pump';

class PumpService {
    create(body) {
        return PumpRepository.createPump(body)
        .then(pump => {
            return PumpRepository.getPlainPumpObject(pump);
        })
        .catch(error => {
            throw error;
        });
    }
    
    all() {
        return PumpRepository.findAllPumps()
        .then(response => {
            const pumps = response.map((pump) => (pump.toJSON()));
            return pumps;
        })
        .catch(error => {
            throw error;
        });
    }

    one(id) {
        return PumpRepository.findPumpById(id)
        .then(pump => {
            return PumpRepository.getPlainPumpObject(pump);
        })
        .catch(error => {
            throw error;
        });
    }

    update(id, pump) {
        return PumpRepository.updatePump(id, pump)
        .then(() => {
            return PumpRepository.findPumpById(id)
            .then(pump => {
                return PumpRepository.getPlainPumpObject(pump);
            })
            .catch(error => {
                throw error;
            });
        })
        .catch(error => {
            throw error;
        });
    }

    delete(id) {
        return PumpRepository.findPumpById(id)
        .then(pump => {
            return PumpRepository.deletePump(pump)
            .then(() => {
                return PumpRepository.getPlainPumpObject(pump);
            })
            .catch(error => {
                throw error;
            });
        })
        .catch(error => {
            throw error;
        });
    }
}

export default new PumpService();