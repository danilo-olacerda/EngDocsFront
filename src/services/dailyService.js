import api from './api';

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