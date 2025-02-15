import { create } from 'zustand';
import apiClient from '@/lib/apiClient.js';


const dummy = {
    "vehicle_id": 8,
    "vehicle_full_id": "V-020",
    "vehicle_name": "Vehicle 20",
    "mileage_per_liter": 15.5,
    "operation": "Average",
};

const useFuelEfficiencyStore = create((set, get) => ({
    vehicleId: null,
    operation: null,

    vehicle_data: null,
    vehicle_data_loading: false,
    vehicle_data_error: null,

    fetchData: async (vehicleId) => {
        set({ vehicle_data_loading: true });
        try {
            const response = await apiClient.get(`/recipes/1`);
            set({ vehicle_data: dummy });
        } catch (error) {
            set({ vehicle_data_error: error.message });
        } finally {
            set({ vehicle_data_loading: false });
        }
    },

    reset: () => {
        set({
            vehicle_data: null,
            vehicle_data_loading: false,
            vehicle_data_error: null
        });
    }

}));


export default useFuelEfficiencyStore;