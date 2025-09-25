import { useForm } from "react-hook-form";
import Input from "../../components/ui/Inout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";

export type DepartmentFormValues = {
  code: string;
  name: string;
};

type DepartmentFormProps = {
  mode: "create" | "edit";
  initialData?: DepartmentFormValues;
};

export default function DepartmentForm({ mode, initialData }: DepartmentFormProps) {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormValues>({
    defaultValues: initialData ?? {
      code: "",
      name: "",
    },
  });

  const onSubmit = async (data: DepartmentFormValues) => {
    if (mode === "create") {
      // TODO: call backend POST /departments
      alert(`Department "${data.name}" created (mock).`);
    } else {
      // TODO: call backend PUT /departments/:id
      alert(`Department "${data.name}" updated (mock).`);
    }
    nav("/departments");
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">
          {mode === "create" ? "Add Department" : "Edit Department"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Department Code"
            placeholder="CSE"
            {...register("code", {
              required: "Code is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
            error={errors.code?.message}
          />

          <Input
            label="Department Name"
            placeholder="Computer Science"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            error={errors.name?.message}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="soft"
              onClick={() => nav("/departments")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : mode === "create" ? "Save" : "Update"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
