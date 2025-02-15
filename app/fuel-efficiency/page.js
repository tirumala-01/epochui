"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import useFuelEfficiencyStore from "@/stores/FuelEfficiency";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Fuel, Bug } from 'lucide-react';

const formSchema = z.object({
    vehicleId: z.string().trim().regex(/^V-(0[0-9]{2}|[1-9][0-9]{2})$/, { message: "Enter Valid ID" }),
    operation: z.enum(["average", "maximum", "minimum"]).default("average"),
});


export default function FuelEfficiency() {
    let { fetchData, vehicle_data, vehicle_data_loading, vehicle_data_error, reset } = useFuelEfficiencyStore();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicleId: "",
            operation: "average",
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
                                    <CardTitle>Fuel Efficiency</CardTitle>
                                    <CardDescription>Check mileage per liter.</CardDescription>
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

                                    <FormField
                                        control={form.control}
                                        name="operation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Efficiency Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="average" selected>Average</SelectItem>
                                                        <SelectItem value="maximum">Maximum</SelectItem>
                                                        <SelectItem value="minimum">Minimum</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
                                <CardTitle>{vehicle_data.operation} Fuel Efficiency</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Vehicle ID: {vehicle_data.vehicle_full_id}</p>
                                <p>Vehicle Name: {vehicle_data.vehicle_name}</p>
                                <p>Mileage Per Liter: {vehicle_data.mileage_per_liter}</p>
                            </CardContent>
                            <CardFooter>
                                <Fuel />
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}