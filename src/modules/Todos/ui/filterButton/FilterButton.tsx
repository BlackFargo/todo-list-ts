import type { FC } from 'react'

type FilterButtonProps = {
	label: string
	colorClass: string
	onClick: () => void
	ariaLabel: string
}

export const FilterButton: FC<FilterButtonProps> = ({
	label,
	colorClass,
	onClick,
	ariaLabel,
}) => (
	<button
		type='button'
		aria-label={ariaLabel}
		onClick={onClick}
		className={`p-5 w-full cursor-pointer hover:brightness-90 transition duration-300 ${colorClass} text-white font-bold`}
	>
		{label}
	</button>
)
