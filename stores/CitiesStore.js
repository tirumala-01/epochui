import { create } from 'zustand';
import apiClient from '@/lib/apiClient.js';

const useCitiesStore = create((set, get) => ({
    city_data: null,
    city_data_loading: false,
    city_data_error: null,

    fetchCostData: async (values) => {
        set({ city_data_loading: true, city_data_error: null });
        try {
            let result = await apiClient.get(`/shipments/cost/${encodeURIComponent(values.origin)}/${encodeURIComponent(values.destination)}?operation=${values.operation}`);
            if (result.status >= 200 && result.status < 300) {
                const mappedData = {
                    ...Object.fromEntries(
                        Object.entries(result.data).filter(
                            ([key]) => !key.endsWith('route_id')
                        )
                    )
                };
                set({city_data: mappedData});
            } else {
                set({ city_data_error: `Error: ${response.statusText}` });
            }
        } catch (error) {
            set({ city_data_error: error.message });
        } finally {
            set({ city_data_loading: false });
        }
    },
    resetCityStore: () => {
        set({
            city_data: null,
            city_data_loading: false,
            city_data_error: null,
        });
    },
    fetchTimeData: async (values) => {
        set({ city_data_loading: true, city_data_error: null });
        try {
            let result = await apiClient.get(`/shipments/delivery-time/${encodeURIComponent(values.origin)}/${encodeURIComponent(values.destination)}?operation=${values.operation}`);
            if (result.status >= 200 && result.status < 300) {
                const mappedData = {
                    ...Object.fromEntries(
                        Object.entries(result.data).filter(
                            ([key]) => !key.endsWith('route_id')
                        )
                    )
                };
                set({city_data: mappedData});
            } else {
                set({ city_data_error: `Error: ${response.statusText}` });
            }
        } catch (error) {
            set({ city_data_error: error.message });
        } finally {
            set({ city_data_loading: false });
        }
    },

}));

export default useCitiesStore;