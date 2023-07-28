import React from "react";
import { Example, Placeholder } from "utilities/storybook";
import IconZap from "icons/Zap";
import TextField from "components/TextField";
import FormControl from "components/FormControl";

export default { title: "Components/TextField" };

export const value = () => (
	<Example>
		<Example.Item title="no value, placeholder">
			<TextField name="Name" placeholder="Enter your name" icon={IconZap} />
		</Example.Item>

		<Example.Item title="value, uncontrolled">
			<TextField name="Name" defaultValue="Reshaped" placeholder="Enter your name" />
		</Example.Item>

		<Example.Item title="value, controlled">
			<TextField name="Name" value="Reshaped" placeholder="Enter your name" />
		</Example.Item>
	</Example>
);

export const variants = () => (
	<Example>
		<Example.Item title="variant: faded">
			<TextField variant="faded" name="Name" placeholder="Enter your name" />
		</Example.Item>

		<Example.Item title="variant: headless">
			<TextField variant="headless" name="Name" placeholder="Enter your name" />
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled, no value">
			<TextField name="Name" placeholder="Enter your name" disabled />
		</Example.Item>
		<Example.Item title="disabled, value">
			<TextField name="Name" placeholder="Enter your name" disabled value="Reshaped" />
		</Example.Item>
	</Example>
);

export const error = () => (
	<Example>
		<Example.Item title="error">
			<TextField name="Name" placeholder="Enter your name" hasError />
		</Example.Item>
	</Example>
);

export const icon = () => (
	<Example>
		<Example.Item title="icon">
			<TextField name="Name" placeholder="Enter your name" value="Reshaped" icon={IconZap} />
		</Example.Item>
		<Example.Item title="endIcon">
			<TextField name="Name" placeholder="Enter your name" value="Reshaped" endIcon={IconZap} />
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: medium">
			<TextField name="Name" placeholder="Enter your name" size="medium" icon={IconZap} />
		</Example.Item>

		<Example.Item title="size: large">
			<TextField name="Name" placeholder="Enter your name" size="large" icon={IconZap} />
		</Example.Item>

		<Example.Item title="size: xlarge">
			<TextField name="Name" placeholder="Enter your name" size="xlarge" icon={IconZap} />
		</Example.Item>

		<Example.Item title={["responsive size", "[s] xlarge", "[m+] medium"]}>
			<TextField
				name="Name"
				placeholder="Enter your name"
				size={{ s: "xlarge", m: "medium" }}
				icon={IconZap}
			/>
		</Example.Item>
	</Example>
);

export const affixes = () => (
	<Example>
		<Example.Item title="prefix">
			<TextField name="phone" placeholder="Enter your phone number" value="Reshaped" prefix="+31" />
		</Example.Item>

		<Example.Item title="suffix">
			<TextField name="area" placeholder="Enter your room ara" value="25" suffix="m2" />
		</Example.Item>
	</Example>
);

export const slots = () => (
	<Example>
		<Example.Item title={["startSlot", "vertical and horizontal padding aligned"]}>
			<TextField
				name="Name"
				placeholder="Enter your name"
				value="Reshaped"
				startSlot={<Placeholder h={28} />}
			/>
		</Example.Item>
		<Example.Item title={["endSlot", "vertical and horizontal padding aligned"]}>
			<TextField
				name="Name"
				placeholder="Enter your name"
				value="Reshaped"
				endSlot={<Placeholder h={28} />}
			/>
		</Example.Item>
	</Example>
);

export const formControl = () => (
	<Example>
		<Example.Item title="with helper">
			<FormControl>
				<FormControl.Label>Name</FormControl.Label>
				<TextField name="name" placeholder="Enter your name" />
				<FormControl.Helper>Helper</FormControl.Helper>
				<FormControl.Error>This field is required</FormControl.Error>
			</FormControl>
		</Example.Item>
		<Example.Item title="with error">
			<FormControl hasError>
				<FormControl.Label>Name</FormControl.Label>
				<TextField name="name" placeholder="Enter your name" />
				<FormControl.Error>This field is required</FormControl.Error>
			</FormControl>
		</Example.Item>
	</Example>
);
