import React from "react";
import { vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "components/Modal";
import Reshaped from "components/Reshaped";

const fixtures = {
	content: "Content",
	title: "Title",
	subtitle: "Subtitle",
	className: "test-className",
	id: "test-id",
};

describe("Components/Modal", () => {
	test("doesn't render children", () => {
		render(
			<Reshaped>
				<Modal>{fixtures.content}</Modal>
			</Reshaped>
		);

		expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
	});

	test("renders correctly when active", () => {
		render(
			<Reshaped>
				<Modal active>
					<Modal.Title>{fixtures.title}</Modal.Title>
					<Modal.Subtitle>{fixtures.subtitle}</Modal.Subtitle>
					{fixtures.content}
				</Modal>
			</Reshaped>
		);

		const elModal = screen.getByRole("dialog");
		const elTitle = screen.getByText(fixtures.title);
		const elSubtitle = screen.getByText(fixtures.subtitle);
		const titleId = elTitle.getAttribute("id");
		const subtitleId = elSubtitle.getAttribute("id");

		expect(elModal).toBeInTheDocument();
		expect(elTitle).toBeInTheDocument();
		expect(elSubtitle).toBeInTheDocument();
		expect(titleId).toMatchSnapshot();
		expect(subtitleId).toMatchSnapshot();

		expect(elModal).toHaveAttribute("aria-modal", "true");
		expect(elModal).toHaveAttribute("aria-labelledby", titleId);
		expect(elModal).toHaveAttribute("aria-describedby", subtitleId);
	});

	test("works with className and attributes", () => {
		render(
			<Reshaped>
				<Modal active className={fixtures.className} attributes={{ id: fixtures.id }}>
					{fixtures.content}
				</Modal>
			</Reshaped>
		);

		const elModal = screen.getByRole("dialog");

		expect(elModal).toHaveClass(fixtures.className);
		expect(elModal).toHaveAttribute("id", fixtures.id);
	});

	test("works as controlled", async () => {
		const handleCloseMock = vi.fn();

		const Component = () => {
			const [active, setActive] = React.useState(true);

			const handleOpen = () => {
				setActive(true);
			};

			const handleClose = () => {
				setActive(false);
				handleCloseMock();
			};

			return (
				<Reshaped>
					<button type="button" onClick={handleOpen}>
						Open
					</button>
					<Modal active={active} onClose={handleClose}>
						{fixtures.content}
					</Modal>
				</Reshaped>
			);
		};
		render(<Component />);

		expect(screen.queryByText(fixtures.content)).toBeInTheDocument();

		await userEvent.keyboard("{Escape}");

		/**
		 * Need to trigger transition event on the correct element
		 * since Overlay ignores event bubbling to prevent it from closing based on other elements transitionend
		 */
		const overlayEl = screen.getAllByRole("button")[1];
		fireEvent.transitionEnd(overlayEl, {
			propertyName: "opacity",
		});

		await waitFor(() => {
			expect(handleCloseMock).toBeCalledTimes(1);
			expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
		});

		const elButton = screen.getByText("Open");

		await userEvent.click(elButton);

		expect(screen.getByText(fixtures.content)).toBeInTheDocument();
	});
});
