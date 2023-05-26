import { component$, Slot } from "@builder.io/qwik";

export interface FormControlProps {
  title: string;
  isOptional?: boolean;
  error?: string;
}

export const FormControl = component$<FormControlProps>((props) => {
  const { title, isOptional, error, ...rest } = props;

  return (
    <div class="form-control w-full" {...rest}>
      <label class="label">
        <span class="label-text">
          {title} {isOptional ? <span>(Optional)</span> : null}
        </span>
        <span class="label-text-alt text-red-500">{error}</span>
      </label>
      <Slot />
    </div>
  );
});
