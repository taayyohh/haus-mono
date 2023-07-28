import React from "react";
import { Example } from "utilities/storybook";
import Actionable from "components/Actionable";
import View from "components/View";

export default { title: "Utilities/Actionable" };

export const role = () => (
	<Example>
		<Example.Item title="rendered as link">
			<Actionable href="https://reshaped.so" attributes={{ target: "_blank" }}>
				Actionable
			</Actionable>
		</Example.Item>
		<Example.Item title="rendered as button">
			<Actionable onClick={() => console.log("Clicked")}>Actionable</Actionable>
		</Example.Item>
		<Example.Item title="rendered as div with button role">
			<Actionable as="div" onClick={() => console.log("Clicked")}>
				Actionable
			</Actionable>
		</Example.Item>
		<Example.Item title="rendered as link with onClick">
			<Actionable onClick={() => console.log("Clicked")} href="https://reshaped.so">
				Actionable
			</Actionable>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled, button">
			<Actionable disabled onClick={() => {}}>
				Actionable
			</Actionable>
		</Example.Item>
		<Example.Item title="disabled, link">
			<Actionable disabled href="https://reshaped.so">
				Actionable
			</Actionable>
		</Example.Item>
	</Example>
);

export const fullWidth = () => (
	<Example>
		<Example.Item title="fullWidth">
			<Actionable fullWidth href="https://reshaped.so">
				Actionable
			</Actionable>
		</Example.Item>
	</Example>
);

export const focusRing = () => (
	<Example>
		<Example.Item title="insetFocus">
			<Actionable insetFocus onClick={() => {}}>
				Actionable
			</Actionable>
		</Example.Item>
		<Example.Item title="radius: inherit">
			<Actionable borderRadius="inherit" onClick={() => {}}>
				<View borderRadius="large">Actionable</View>
			</Actionable>
		</Example.Item>
	</Example>
);
