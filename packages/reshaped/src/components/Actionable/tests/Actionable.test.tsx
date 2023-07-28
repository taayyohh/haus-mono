import React from "react";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Actionable from "components/Actionable";

const fixtures = {
	content: "Click here",
	className: "test-className",
	id: "test-id",
	href: "reshaped.so",
};

describe("Utilities/Actionable", () => {
	test("renders children", () => {
		render(<Actionable>{fixtures.content}</Actionable>);

		const el = screen.getByText(fixtures.content);

		expect(el).toBeInTheDocument();
		expect(el.tagName).toBe("SPAN");
	});

	test("renders link from href property", () => {
		render(<Actionable href={fixtures.href}>{fixtures.content}</Actionable>);

		const el = screen.getByRole("link");

		expect(el).toHaveAttribute("href", fixtures.href);
	});

	test("renders link from href attribute", () => {
		render(<Actionable attributes={{ href: fixtures.href }}>{fixtures.content}</Actionable>);

		const el = screen.getByRole("link");

		expect(el).toHaveAttribute("href", fixtures.href);
	});

	test("renders link with onClick", async () => {
		const handleClick = vi.fn();
		render(
			<Actionable href={fixtures.href} onClick={handleClick}>
				{fixtures.content}
			</Actionable>
		);

		const el = screen.getByRole("link");
		el.addEventListener("click", (e) => e.preventDefault());
		await userEvent.click(el);

		expect(el).toHaveAttribute("href", fixtures.href);
		expect(handleClick).toBeCalledTimes(1);
	});

	test("renders button", async () => {
		const handleClick = vi.fn();
		render(<Actionable onClick={handleClick}>{fixtures.content}</Actionable>);

		const el = screen.getByRole("button");
		await userEvent.click(el);

		expect(el).toHaveAttribute("type", "button");
		expect(handleClick).toBeCalledTimes(1);
	});

	test("works with disabled property", async () => {
		const handleClick = vi.fn();
		render(
			<Actionable onClick={handleClick} disabled>
				{fixtures.content}
			</Actionable>
		);

		const el = screen.getByRole("button");
		await userEvent.click(el);

		expect(el).toHaveAttribute("type", "button");
		expect(el).toBeDisabled();
		expect(handleClick).toBeCalledTimes(0);
	});

	test("renders className and attributes", () => {
		const { container } = render(
			<Actionable className={fixtures.className} attributes={{ id: fixtures.id }}>
				{fixtures.content}
			</Actionable>
		);

		expect(container.firstChild).toBeInTheDocument();
		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
