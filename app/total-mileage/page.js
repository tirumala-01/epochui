"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import useTotalMileageStore from "@/stores/TotalMileage";
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

import { Earth, Bug } from 'lucide-react';

const formSchema = z.object({
    vehicleId: z.string().trim().regex(/^V-(0[0-9]{2}|[1-9][0-9]{2})$/, { message: "Enter Valid ID" })
});

export default function TotalMileage() {
    let { fetchData, vehicle_data, vehicle_data_loading, vehicle_data_error, reset } = useTotalMileageStore();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicleId: "",
        },
    });

    async function onSubmit(values) {
        try {
            await fetchData(values);
        } catch (error) {
            form.setError("vehicleId", { message: error.message });
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
                                    <CardTitle>Total Mileage and Fuel Usage</CardTitle>
                                    <CardDescription>Check distance travelled and fuel consumed.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">

                                    <FormField
                                        control={form.control}
                                        name="vehicleId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vehicle ID*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="V-001" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={handleReset}>Reset</Button>
                                    <Button type="submit" disabled={vehicle_data_loading}>
                                        {vehicle_data_loading ? "Loading..." : "Submit"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </Form>
                </div>

                {vehicle_data_error && (
                    <div className="w-full sm:w-auto">
                        <Card className="w-full sm:w-[350px]">
                            <CardHeader>
                                <CardTitle>Error</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-red-500">{vehicle_data_error}</p>
                            </CardContent>
                            <CardFooter>
                                <Bug />
                            </CardFooter>
                        </Card>
                    </div>
                )}

                {vehicle_data && (
                    <div className="w-full sm:w-auto">
                        <Card className="w-full sm:w-[350px]">
                            <CardHeader>
                                <CardTitle>Distance and Fuel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>ID: {vehicle_data.vehicle_full_id}</p>
                                <p>Name: {vehicle_data.vehicle_name}</p>
                                <p>Distance Travelled: {vehicle_data.total_distance_travelled}</p>
                                <p>Fuel Consumed: {vehicle_data.total_fuel_consumed}</p>
                            </CardContent>
                            <CardFooter>
                                <Earth />
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}