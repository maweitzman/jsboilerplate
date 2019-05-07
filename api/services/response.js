class ResponseService {
    informational(res, response, message) {
        res.append('X-Message-Info', message);
        res.status(200).json(response);
    }

    successful(res, response, message) {
        res.append('X-Message-Success', message);
        res.status(200).json(response);
    }
}

export default new ResponseService();