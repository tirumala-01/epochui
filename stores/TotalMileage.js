import { create } from 'zustand';
import apiClient from '@/lib/apiClient.js';


const dummy = {
    "vehicle_id" : 1,
    "vehicle_full_id" : "V-001",
    "vehicle_name" : "Vehicle 1",
    "total_distance_travelled" : 6518098.08,
    "total_fuel_consumed" : 690263.29
}

const useTotalMileageStore = create((set) => ({
    vehicleId: null,
    vehicle_data: null,
    vehicle_data_loading: false,
    vehicle_data_error: null,

    fetchData: async (vehicleId) => {
        set({ vehicle_data_loading: true });
        try {
            const response = await apiClient.get(`/vehicles/total-usage/${vehicleId}`);
            if (response.status >= 200 && response.status < 300) {
                const mappedData = {
                    ...Object.fromEntries(
                        Object.entries(response.data).filter(
                            ([key]) => !key.endsWith('vehicle_id')
                        )
                    )
                };

                if (mappedData['vehicle_full_id']) {
                    mappedData['vehicle_id'] =mappedData['vehicle_full_id'];
                    delete mappedData['vehicle_full_id'];
                }
                set({ vehicle_data: mappedData });
            } else {
                set({ vehicle_data_error: `Error: ${response.statusText}` });
            }
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