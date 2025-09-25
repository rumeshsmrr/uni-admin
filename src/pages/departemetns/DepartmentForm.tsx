import { useForm } from "react-hook-form";
import Input from "../../components/ui/Inout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DepartmentAPI } from "../../api/departments";
import { AxiosError } from "axios";

export type DepartmentFormValues = {
  departmentCode: string;
  departmentName: string;
};

type DepartmentFormProps = {
  mode: "create" | "edit";
  initialData?: DepartmentFormValues;
};

export default function DepartmentForm({ mode, initialData }: DepartmentFormProps) {
  const nav = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormValues>({
    defaultValues: initialData ?? {
      departmentCode: "",
      departmentName: "",
    },
  });

  // ✅ Create mutation
  const createMutation = useMutation({
    mutationFn: DepartmentAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      nav("/departments");
    },
    onError: (error: AxiosError) => {
      const msg =
        (error.response?.data as { message?: string })?.message ||
        "Failed to create department.";
      alert(msg);
    },
  });

  // ✅ Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: DepartmentFormValues) =>
      DepartmentAPI.update(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      nav("/departments");
    },
    onError: (error: AxiosError) => {
      const msg =
        (error.response?.data as { message?: string })?.message ||
        "Failed to update department.";
      alert(msg);
    },
  });

  // ✅ Submit handler
  const onSubmit = (data: DepartmentFormValues) => {
    if (mode === "create") {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
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
            {...register("departmentCode", {
              required: "Code is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
            error={errors.departmentCode?.message}
          />

          <Input
            label="Department Name"
            placeholder="Computer Science"
            {...register("departmentName", {
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            error={errors.departmentName?.message}
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
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                ? "Save"
                : "Update"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
