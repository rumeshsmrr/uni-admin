import { useForm } from "react-hook-form";
import Input from "../../components/ui/Inout";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  EmployeeAPI,
} from "../../api/employees";
import type { EmployeeCreatePayload, EmployeeUpdatePayload } from "../../api/employees";

import { DepartmentAPI } from "../../api/departments";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  age: number;
  salary: number;
  departmentId: string;
  rowVersion?: string;
};

type ProblemDetails = {
  type?: string;
  title?: string;
  status?: number;
  traceId?: string;
  errors?: Record<string, string[]>; // field → array of messages
};


type EmployeeFormProps = {
  mode: "create" | "edit";
  initialData?: FormValues;
};

export default function EmployeeForm({ mode, initialData }: EmployeeFormProps) {
  const nav = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // 🔔 Error alert messages
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Departments dropdown
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: DepartmentAPI.getAll,
  });

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

  // Auto-calc age from dob
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

  // ✅ Create mutation
  const createMutation = useMutation({
    mutationFn: (data: EmployeeCreatePayload) => EmployeeAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      nav("/employees");
    },
    onError: (error: AxiosError<ProblemDetails>) => {
      const errs = error.response?.data?.errors;
      if (errs) {
        const messages = Object.values(errs).flat();
        setFormErrors(messages);
      } else {
        setFormErrors([error.message || "Failed to create employee."]);
      }
    },
    
  });

  // ✅ Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: EmployeeUpdatePayload) =>
      EmployeeAPI.update(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      nav("/employees");
    },
    onError: (error: AxiosError<ProblemDetails>) => {
      const errs = error.response?.data?.errors;
      if (errs) {
        const messages = Object.values(errs).flat();
        setFormErrors(messages);
      } else {
        setFormErrors([error.message || "Failed to update employee."]);
      }
    },
    
  });

  // ✅ Submit handler
  const onSubmit = (data: FormValues) => {
    setFormErrors([]); // reset before new request

    if (mode === "create") {
      const payload: EmployeeCreatePayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dob: data.dob,
        salary: data.salary,
        departmentId: Number(data.departmentId),
      };
      createMutation.mutate(payload);
    } else {
      const payload: EmployeeUpdatePayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dob: data.dob,
        salary: data.salary,
        departmentId: Number(data.departmentId),
        rowVersion: data.rowVersion!, // must send for concurrency
      };
      updateMutation.mutate(payload);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">
          {mode === "create" ? "Add Employee" : "Edit Employee"}
        </h1>

        {/* 🔔 Alert with validation messages */}
        {formErrors.length > 0 && (
          <div className="rounded-md bg-red-50 border border-red-400 p-3 text-red-700">
            <ul className="list-disc list-inside space-y-1">
              {formErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              {...register("firstName", { required: "First name is required" })}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              {...register("lastName", { required: "Last name is required" })}
              error={errors.lastName?.message}
            />
          </div>

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            {...register("email", { required: "Email is required" })}
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
              {...register("age")}
              error={errors.age?.message}
              readOnly
            />
          </div>

          {/* Salary */}
          <Input
            label="Salary"
            type="number"
            {...register("salary", { required: "Salary is required" })}
            error={errors.salary?.message}
          />

          {/* Department */}
          <Select
            label="Department"
            {...register("departmentId", { required: "Department is required" })}
            error={errors.departmentId?.message}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.departmentName}
              </option>
            ))}
          </Select>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="soft" onClick={() => nav("/employees")}>
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
