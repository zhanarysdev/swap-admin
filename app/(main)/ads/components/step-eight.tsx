import { Input } from "@/components/input/input";
import { Label } from "@/components/input/label";

export const StepEight = ({ form }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full">
                <Label label="Номер карты" />
                <Input
                    {...form.register("card_number")}
                    placeholder="4000001111111118"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label label="Владелец карты" />
                <Input
                    {...form.register("card_holder")}
                    placeholder="TEST CARDHOLDER"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label label="CVC" />
                <Input
                    {...form.register("cvc")}
                    placeholder="123"
                    maxLength={3}
                />
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <Label label="Месяц" />
                    <Input
                        {...form.register("expiry_month")}
                        placeholder="12"
                        maxLength={2}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label label="Год" />
                    <Input
                        {...form.register("expiry_year")}
                        placeholder="2030"
                        maxLength={4}
                    />
                </div>
            </div>
        </div>
    );
}; 