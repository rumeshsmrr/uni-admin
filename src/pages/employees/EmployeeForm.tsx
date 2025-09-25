import { useForm } from "react-hook-form";
import Input from "../../components/ui/Inout";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { departmentsMock} from "../../data/mock";
import { useEffect } from "react";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  age: number;
  salary: number;
  departmentId: string;
};

type EmployeeFormProps = {
  mode: "create" | "edit";
  initialData?: FormValues;
};

export default function EmployeeForm({ mode, initialData }: EmployeeFormProps) {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: initialData ?? {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      age: 18,
      salary: 0,
      departmentId: "",
    },
  });

  // auto-calc age
  const dob = watch("dob");
  useEffect(() => {
    if (dob) {
      const birth = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      setValue("age", age);
    }
  }, [dob, setValue]);

  const onSubmit = async (data: FormValues) => {
    if (mode === "create") {
      // TODO: call backend POST
      alert(`Employee "${data.firstName} ${data.lastName}" created (mock).`);
    } else {
      // TODO: call backend PUT
      alert(`Employee "${data.firstName} ${data.lastName}" updated (mock).`);
    }
    nav("/employees");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">
          {mode === "create" ? "Add Employee" : "Edit Employee"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 2, message: "At least 2 characters" },
              })}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 2, message: "At least 2 characters" },
              })}
              error={errors.lastName?.message}
            />
          </div>

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            error={errors.email?.message}
          />

          {/* DOB + Age */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              type="date"
              {...register("dob", { required: "Date of birth is required" })}
              error={errors.dob?.message}
            />
            <Input
              label="Age"
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Must be at least 18" },
                valueAsNumber: true,
              })}
              error={errors.age?.message}
              readOnly
            />
          </div>

          {/* Salary */}
          <Input
            label="Salary"
            type="number"
            {...register("salary", {
              required: "Salary is required",
              min: { value: 1, message: "Salary must be greater than 0" },
              valueAsNumber: true,
            })}
            error={errors.salary?.message}
          />

          {/* Department */}
          <Select
            label="Department"
            {...register("departmentId", { required: "Department is required" })}
            error={errors.departmentId?.message}
          >
            <option value="">Select Department</option>
            {departmentsMock.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="soft"
              onClick={() => nav("/employees")}
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
