import api from './api';

const debitService = {

    debitCompte: async (debitData) => {
        const response = await api.post('/debit-compte', debitData);
        return response.data;
    }
};

export default debitService;