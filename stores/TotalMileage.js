import { create } from 'zustand';
import apiClient from '@/lib/apiClient.js';


const dummy = {
    "vehicle_id" : 1,
    "vehicle_full_id" : "V-001",
    "vehicle_name" : "Vehicle 1",
    "total_distance_travelled" : 6518098.08,
    "total_fuel_consumed" : 690263.29
}

const useTotalMileageStore = create((set, get) => ({
    vehicleId: null,
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


export default useTotalMileageStore;