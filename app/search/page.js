"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import useSearchStore from "@/stores/Search";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { FileSearch, Bug } from 'lucide-react';

const formSchema = z.object({
    id: z.string().trim().regex(/^(?:[LS]-(0{5}[1-9]|[1-9][0-9]{5})|V-(0{2}[1-9]|[1-9][0-9]{2}))$/, { message: "Enter Valid ID" })
});

function findPattern(value) {
    const patterns = [
        { name: "shipment_id", regex: /^(S-(0{5}[1-9]|[1-9][0-9]{5}))$/ },
        { name: "log_id", regex: /^(L-(0{5}[1-9]|[1-9][0-9]{5}))$/ },
        { name: "vehicle_id", regex: /^V-(0{2}[1-9]|[1-9][0-9]{2})$/ }
    ];

    const matchedPattern = patterns.find(({ regex }) => regex.test(value.id));
    return matchedPattern ? matchedPattern.name : '';
};


export default function Search() {
    let {
        fetchVehicle,
        fetchShipment,
        fetchLog,
        reset,
        resource_data,
        resource_data_loading,
        resource_data_error,
    } = useSearchStore();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
        },
    });

    async function onSubmit(value) {
        try {
            let resource = findPattern(value);
            switch (resource) {
                case 'shipment_id':
                    await fetchShipment(value);
                    break;
                case 'log_id':
                    await fetchLog(value);
                    break;
                case 'vehicle_id':
                    await fetchVehicle(value);
                    break;
                default:
                    form.setError("id", { message: "Invalid ID" });
                    break;
            }
        } catch (error) {
            form.setError("id", { message: error.message });
            console.error(error);
        }
    }

    function handleReset() {
        form.reset();
        form.clearErrors();
        reset();
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] justify-start min-h-full p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-wrap gap-8 justify-center">
                <div className="w-full sm:w-auto">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <Card className="w-full sm:w-[350px]">
                                <CardHeader>
                                    <CardTitle>Search</CardTitle>
                                    <CardDescription>Shipment, Vehicle or Logs.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ID*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="S-000001, L-000001, V-001" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={handleReset}>Reset</Button>
                                    <Button type="submit" disabled={resource_data_loading}>
                                        {resource_data_loading ? "Loading..." : "Submit"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Form>
                </div>

                {resource_data_error && (
                    <div className="w-full sm:w-auto">
                        <Card className="w-full sm:w-[350px]">
                            <CardHeader>
                                <CardTitle>Error</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-red-500">{resource_data_error}</p>
                            </CardContent>
                            <CardFooter>
                                <Bug />
                            </CardFooter>
                        </Card>
                    </div>
                )}

                {resource_data && (
                    <div className="w-full sm:w-auto">
                        <Card className="w-full sm:w-[350px]">
                            <CardHeader>
                                <CardTitle>{resource_data.resourceType} Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>ID: {resource_data.vehicle_id}</p>
                                <p>Name: {resource_data.name}</p>
                                {!resource_data.shipment_id && !resource_data.log_id && (
                                    <p>Total Mileage: {resource_data.total_mileage} kms</p>
                                )}
                                {resource_data.shipment_id && (
                                    <div>
                                        <p>Shipment ID: {resource_data.shipment_id}</p>
                                        <p>Origin: {resource_data.origin}</p>
                                        <p>Destination: {resource_data.destination}</p>
                                        <p>Weight: {resource_data.weight}</p>
                                        <p>Cost: {resource_data.cost}</p>
                                        <p>Delivery Time: {resource_data.delivery_time}</p>
                                        <p>Trip Date: {resource_data.trip_date}</p>
                                        <p>Mileage: {resource_data.mileage} kms</p>
                                        <p>Fuel Used: {resource_data.fuel_used} liters</p>
                                    </div>
                                )}

                                {!resource_data.shipment_id && resource_data.log_id && (
                                    <div>
                                        <p>Trip Date: {resource_data.trip_date}</p>
                                        <p>Mileage: {resource_data.mileage} kms</p>
                                        <p>Fuel Used: {resource_data.fuel_used} liters</p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <FileSearch />
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}