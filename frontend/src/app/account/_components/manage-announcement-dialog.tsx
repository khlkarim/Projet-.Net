"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useCreateAnnouncement, useUpdateAnnouncement } from "~/features/announcements/hooks/announcements.hooks";
import { AnnouncementResponse, createAnnouncementRequestSchema } from "~/features/announcements/schemas/announcements.schemas";
import { AnnouncementType, FuelType, TransmissionType, VehicleType } from "~/types/enums";
import { Button } from "~/ui/primitives/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/ui/primitives/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/ui/primitives/form";
import { Input } from "~/ui/primitives/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/primitives/select";
import { Textarea } from "~/ui/primitives/textarea";

// Extended schema to handle file input in the form
const formSchema = createAnnouncementRequestSchema.extend({
    files: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ManageAnnouncementDialogProps {
    announcement?: AnnouncementResponse | null; // If provided, we are in "Edit" mode
    onOpenChange: (open: boolean) => void;
    open: boolean;
}

export function ManageAnnouncementDialog({
    announcement,
    onOpenChange,
    open,
}: ManageAnnouncementDialogProps) {
    const isEditMode = !!announcement;
    const [files, setFiles] = useState<File[]>([]);

    const { isPending: isCreating, mutateAsync: createAnnouncement } = useCreateAnnouncement();
    const { isPending: isUpdating, mutateAsync: updateAnnouncement } = useUpdateAnnouncement();

    const form = useForm<FormValues>({
        defaultValues: {
            announcementType: AnnouncementType.SALE,
            brand: "",
            color: "",
            description: "",
            fuelType: FuelType.PETROL,
            mileage: 0,
            model: "",
            price: 0,
            title: "",
            transmission: TransmissionType.MANUAL,
            vehicleType: VehicleType.SEDAN,
        },
        resolver: zodResolver(formSchema) as any,
    });

    // Reset form when opening/closing or changing announcement
    useEffect(() => {
        if (open) {
            if (announcement) {
                form.reset({
                    announcementType: announcement.announcementType,
                    brand: announcement.brand,
                    color: announcement.color,
                    description: announcement.description,
                    fuelType: announcement.fuelType,
                    mileage: announcement.mileage,
                    model: announcement.model,
                    price: announcement.price,
                    title: announcement.title,
                    transmission: announcement.transmission,
                    vehicleType: announcement.vehicleType,
                });
            } else {
                form.reset({
                    announcementType: AnnouncementType.SALE,
                    brand: "",
                    color: "",
                    description: "",
                    fuelType: FuelType.PETROL,
                    mileage: 0,
                    model: "",
                    price: 0,
                    title: "",
                    transmission: TransmissionType.MANUAL,
                    vehicleType: VehicleType.SEDAN,
                });
                setFiles([]);
            }
        }
    }, [open, announcement, form]);

    const onSubmit = async (values: FormValues) => {
        try {
            if (isEditMode && announcement) {
                await updateAnnouncement({
                    data: {
                        ...values,
                        files: files.length > 0 ? files : undefined,
                    },
                    id: announcement.id
                });
                toast.success("Announcement updated successfully");
            } else {
                await createAnnouncement({
                    ...values,
                    files: files.length > 0 ? files : undefined,
                });
                toast.success("Announcement created successfully");
            }
            onOpenChange(false);
        } catch (error) {
            console.error(error);
            toast.error(isEditMode ? "Failed to update announcement" : "Failed to create announcement");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const isLoading = isCreating || isUpdating;

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Announcement" : "Create Announcement"}</DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Make changes to your announcement here."
                            : "Fill in the details to list your vehicle."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className={`
                          grid grid-cols-1 gap-4
                          md:grid-cols-2
                        `}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. 2020 BMW X5" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price ({isEditMode && announcement?.announcementType === AnnouncementType.RENTAL ? '/day' : '€'})</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe the vehicle..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className={`
                          grid grid-cols-1 gap-4
                          md:grid-cols-2
                        `}>
                            <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Brand" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Model" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className={`
                          grid grid-cols-1 gap-4
                          md:grid-cols-3
                        `}>
                            <FormField
                                control={form.control}
                                name="mileage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mileage (km)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Color" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="announcementType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select
                                            defaultValue={field.value.toString()}
                                            onValueChange={(val) => field.onChange(Number(val))}
                                            value={field.value.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.keys(AnnouncementType)
                                                    .filter((k) => isNaN(Number(k)))
                                                    .map((key) => {
                                                        const typeValue = AnnouncementType[key as keyof typeof AnnouncementType];
                                                        return (
                                                            <SelectItem key={typeValue} value={typeValue.toString()}>
                                                                {key}
                                                            </SelectItem>
                                                        );
                                                    })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Enums Selects */}
                        <div className={`
                          grid grid-cols-1 gap-4
                          md:grid-cols-3
                        `}>
                            <FormField
                                control={form.control}
                                name="vehicleType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vehicle Type</FormLabel>
                                        <Select
                                            defaultValue={field.value.toString()}
                                            onValueChange={(val) => field.onChange(Number(val))}
                                            value={field.value.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select vehicle type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.keys(VehicleType)
                                                    .filter((k) => isNaN(Number(k)))
                                                    .map((key) => {
                                                        const typeValue = VehicleType[key as keyof typeof VehicleType];
                                                        return (
                                                            <SelectItem key={typeValue} value={typeValue.toString()}>
                                                                {key}
                                                            </SelectItem>
                                                        );
                                                    })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fuelType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fuel Type</FormLabel>
                                        <Select
                                            defaultValue={field.value.toString()}
                                            onValueChange={(val) => field.onChange(Number(val))}
                                            value={field.value.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select fuel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.keys(FuelType)
                                                    .filter((k) => isNaN(Number(k)))
                                                    .map((key) => {
                                                        const typeValue = FuelType[key as keyof typeof FuelType];
                                                        return (
                                                            <SelectItem key={typeValue} value={typeValue.toString()}>
                                                                {key}
                                                            </SelectItem>
                                                        );
                                                    })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="transmission"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Transmission</FormLabel>
                                        <Select
                                            defaultValue={field.value.toString()}
                                            onValueChange={(val) => field.onChange(Number(val))}
                                            value={field.value.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select transmission" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.keys(TransmissionType)
                                                    .filter((k) => isNaN(Number(k)))
                                                    .map((key) => {
                                                        const typeValue = TransmissionType[key as keyof typeof TransmissionType];
                                                        return (
                                                            <SelectItem key={typeValue} value={typeValue.toString()}>
                                                                {key}
                                                            </SelectItem>
                                                        );
                                                    })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormLabel>Images</FormLabel>
                            <Input accept="image/*" multiple onChange={handleFileChange} type="file" />
                            <p className="text-xs text-muted-foreground">
                                Avg. max size 5MB per file.
                            </p>
                            {/* Existing files could be shown here if in edit mode, but API might not support deleting individual files easily without a separate endpoint */}
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button disabled={isLoading} type="submit">
                                {isLoading && <Loader2 className={`
                                  mr-2 h-4 w-4 animate-spin
                                `} />}
                                {isEditMode ? "Update" : "Create"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
