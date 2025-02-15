import { create } from 'zustand';
import apiClient from '@/lib/apiClient.js';


const vehicle = {
    "vehicle_id": "V-001",
    "name": "Vehicle 1",
    "total_mileage": 355770.72
};

const shipment = {
    "shipment_id": "S-000001",
    "origin": "Ramirezstad",
    "destination": "Gregoryview",
    "weight": 37.9,
    "cost": 139.87,
    "delivery_time": 15,
    "log_id": "L-000001"
};

const vehicle_log = {
    "log_id": "L-000001",
    "vehicle_id": "V-005",
    "trip_date": "2023-02-12",
    "mileage": 254.55,
    "fuel_used": 78.71
};

const useSearchStore = create((set) => ({
    resourceId: null,
    resource_data: null,
    resource_data_loading: false,
    resource_data_error: null,

    fetchVehicle: async (resourceId) => {
        set({ resource_data_loading: true });
        try {
            const response = await apiClient.get(`/recipes/1`);
            set({ resource_data: { ...vehicle, "resourceType": "Vehicle" } });
        } catch (error) {
            set({ resource_data_error: error.message });
        } finally {
            set({ resource_data_loading: false });
        }
    },

    fetchShipment: async (resourceId) => {
        set({ resource_data_loading: true });
        try {
            const response = await apiClient.get(`/recipes/1`);
            set({ resource_data: { ...vehicle, ...shipment, ...vehicle_log, "resourceType": "Shipment" } });
        } catch (error) {
            set({ resource_data_error: error.message });
        } finally {
            set({ resource_data_loading: false });
        }
    },

    fetchLog: async (resourceId) => {
        set({ resource_data_loading: true });
        try {
            const response = await apiClient.get(`/recipes/1`);
            set({ resource_data: { ...vehicle, ...vehicle_log,  "resourceType": "Vehicle Log" } });
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