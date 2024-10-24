import axios from 'axios';

export default {
    async getWarehouses() {
        const response = await axios.get('/api/warehouses');
        return response.data;
    },
    async getTemperatureData() {
        const response = await axios.get('/api/temperature');
        return response.data;
    }
};
