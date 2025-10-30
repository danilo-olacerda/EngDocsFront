import api from './api.jsx';

export const getBuildDailyParts = async (header) => {

    const response = await api.get('/buildDailyPart', header);

    return response.data;

};

export const getBuildDailyPart = async (id, header) => {

    const response = await api.get(`/buildDailyPart/${id}`, header);

    return response.data;

};

export const getDailyParts = async (header) => {

    const response = await api.get('/dailyPart', header);

    return response.data;

};

export const getDailyPart = async (id, header) => {

    const response = await api.get(`/dailyPart/${id}`, header);

    return response.data;

};

export const newBuildDailyPart = async (data, header) => {

    const response = await api.post('/buildDailyPart', data, header);

    return response.data;

};

export const deleteBuildDailyPart = async (id, header) => {

    const response = await api.delete(`/buildDailyPart/${id}`, header);

    return response.data;

};