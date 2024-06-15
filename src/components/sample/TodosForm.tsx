import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { DevTool } from "@hookform/devtools";
type Todo = {
	id: number;
	text: string;
	isDone: boolean;
};

const sampleTodos: Todo[] = [
	{ id: 1, text: "Todo 1", isDone: false },
	{ id: 2, text: "Todo 2", isDone: true },
	{ id: 3, text: "Todo 3", isDone: false },
];

const TodosForm: React.FC = () => {
	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { isDirty },
	} = useForm({
		defaultValues: {
			todos: sampleTodos,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "todos",
	});

	const onSubmit = (data: Record<string, unknown>) => {
		alert(JSON.stringify(data, null, 2));
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{fields.map((field, index) => (
					<div key={field.id}>
						<Controller
							name={`todos.${index}.isDone`}
							control={control}
							render={({ field }) => (
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<input
							{...register(`todos.${index}.text`)}
							defaultValue={field.text}
						/>
						<button type='button' onClick={() => remove(index)}>
							Remove
						</button>
					</div>
				))}
				<button
					type='button'
					onClick={() =>
						append({
							id: Date.now(),
							text: `Todo ${Date.now()}`,
							isDone: false,
						})
					}>
					Add
				</button>
				{isDirty && <button type='submit'>Submit</button>}
				<DevTool control={control} />
			</form>
		</div>
	);
};

export default TodosForm;
