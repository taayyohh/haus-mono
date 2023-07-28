import React from "react";
import Reshaped from "../../src/components/Reshaped";
import Button from "../../src/components/Button";
import View from "../../src/components/View";
import Text from "../../src/components/Text";
import Hidden from "../../src/components/Hidden";
import DropdownMenu from "../../src/components/DropdownMenu";
import Icon from "../../src/components/Icon";
import useRTL from "../../src/hooks/useRTL";
import IconCheckmark from "../../src/icons/Checkmark";
import { useTheme } from "../../src/components/Theme";
import "../../src/themes/reshaped/theme.css";
import "../../src/themes/slate/theme.css";
import "../../src/themes/figma/theme.css";
import "../../src/themes/fragments/twitter/theme.css";

const ThemeSwitch = () => {
	const { invertColorMode, setTheme, theme } = useTheme();
	const [rtl, setRTL] = useRTL();

	React.useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.code === "KeyM") invertColorMode();
		};

		window.addEventListener("keypress", handleKey);
		return () => window.removeEventListener("keypress", handleKey);
	}, [invertColorMode]);

	return (
		<View
			direction="row"
			align="center"
			gap={2}
			position="fixed"
			insetBottom={2}
			insetEnd={2}
			attributes={{ dir: "ltr" }}
		>
			<Text variant="caption-1" weight="medium">
				<Hidden hide={{ s: false, m: true }} as="span">
					S
				</Hidden>
				<Hidden hide={{ s: true, m: false, l: true }} as="span">
					M
				</Hidden>
				<Hidden hide={{ s: true, l: false, xl: true }} as="span">
					L
				</Hidden>
				<Hidden hide={{ s: true, xl: false }} as="span">
					XL
				</Hidden>
			</Text>

			<Button onClick={() => setRTL(!rtl)} size="small">
				Toggle direction
			</Button>
			<Button onClick={invertColorMode} size="small">
				Toggle mode
			</Button>
			<View.Item>
				<DropdownMenu>
					<DropdownMenu.Trigger>
						{(attributes) => (
							<Button attributes={attributes} size="small">
								Switch theme
							</Button>
						)}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item
							onClick={() => setTheme("reshaped")}
							endSlot={
								theme === "reshaped" ? (
									<Icon svg={IconCheckmark} color="primary" size={5} />
								) : undefined
							}
						>
							Reshaped
						</DropdownMenu.Item>
						<DropdownMenu.Item
							onClick={() => setTheme("slate")}
							endSlot={
								theme === "slate" ? (
									<Icon svg={IconCheckmark} color="primary" size={5} />
								) : undefined
							}
						>
							Slate
						</DropdownMenu.Item>
						<DropdownMenu.Item
							onClick={() => setTheme("figma")}
							endSlot={
								theme === "figma" ? (
									<Icon svg={IconCheckmark} color="primary" size={5} />
								) : undefined
							}
						>
							Figma
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</View.Item>
		</View>
	);
};

const reshapedDecorator = (Story: React.ComponentType) => (
	<React.StrictMode>
		<Reshaped
			defaultTheme="reshaped"
			defaultColorMode="dark"
			toastOptions={{ "bottom-start": { width: "440px", expanded: true } }}
		>
			<View padding={4}>
				<Story />
			</View>
			<ThemeSwitch />
		</Reshaped>
	</React.StrictMode>
);

const preview = {
	decorators: [reshapedDecorator],
};

export const parameters = {
	layout: "fullscreen",
};
export default preview;
