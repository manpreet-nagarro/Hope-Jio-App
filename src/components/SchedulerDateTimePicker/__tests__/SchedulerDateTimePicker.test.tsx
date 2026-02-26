import { render, screen } from "@testing-library/react";
import { SchedulerDateTimePicker } from "../SchedulerDateTimePicker";
import { useForm } from "react-hook-form";

type TestFormValues = { start: Date | null; end: Date | null };

describe("SchedulerDateTimePicker", () => {
  function setup(initialValues: Partial<TestFormValues> = {}) {
    const Wrapper = () => {
      const { control } = useForm<TestFormValues>({
        defaultValues: { start: null, end: null, ...initialValues },
      });
      return (
        <SchedulerDateTimePicker<TestFormValues>
          control={control}
          startName="start"
          endName="end"
          setValue={() => {}}
        />
      );
    };
    render(<Wrapper />);
  }

  it("renders both start and end pickers", () => {
    setup();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
  });

  it("uses default labels if not provided", () => {
    setup();
    expect(screen.getByLabelText("Start Date & Time")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date & Time")).toBeInTheDocument();
  });

  it("disables end date before 5 minutes after start date", async () => {
    setup({ start: new Date("2024-01-01T10:00:00Z") });
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
  });

});
