import { create } from 'zustand';
import apiClient from '@/lib/apiClient.js';


const useSearchStore = create((set) => ({
    resourceId: null,
    resource_data: null,
    resource_data_loading: false,
    resource_data_error: null,

    fetchResource: async (resourceId) => {
        set({ resource_data_loading: true });
        try {
            const response = await apiClient.get(`/search?id=${resourceId}`);
            if (response.status >= 200 && response.status < 300) {
                const mappedData = {
                    ...Object.fromEntries(
                        Object.entries(response.data).filter(
                            ([key]) => !key.startsWith('full_id')
                        )
                    )
                };
                set({ resource_data: mappedData });
            } else {
                set({ resource_data_error: `Error: ${response.statusText}` });
            }
        } catch (error) {
            set({ resource_data_error: error.message });
        } finally {
            set({ resource_data_loading: false });
        }
    },

    reset: () => {
        set({
            resource_data: null,
            resource_data_loading: false,
            resource_data_error: null
        });
    }

}));

export default useSearchStore;