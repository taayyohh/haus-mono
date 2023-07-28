import React from "react";
import { render, screen } from "@testing-library/react";
import Divider from "components/Divider";

const fixtures = {
	className: "test-className",
	id: "test-id",
};

describe("Components/Dismissible", () => {
	test("renders with horizontal orientation", () => {
		render(<Divider />);

		const el = screen.getByRole("separator");
		expect(el).toBeInTheDocument();
		expect(el).toHaveAttribute("aria-orientation", "horizontal");
	});

	test("renders with vertical orientation", () => {
		render(<Divider vertical />);

		const el = screen.getByRole("separator");
		expect(el).toBeInTheDocument();
		expect(el).toHaveAttribute("aria-orientation", "vertical");
	});

	test("renders with responsive orientation", () => {
		render(<Divider vertical={{ s: true, l: false }} />);

		const el = screen.getByRole("separator");
		expect(el).toBeInTheDocument();
		expect(el).not.toHaveAttribute("aria-orientation");
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Divider className={fixtures.className} attributes={{ id: fixtures.id }} />
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
