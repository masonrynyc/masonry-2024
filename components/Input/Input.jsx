import React, { useEffect, useState } from 'react'

const Input = ({
	value,
	type = 'text',
	icon,
	iconPosition = 'left',
	loading,
	error,
	success,
	disabled,
	onClick,
	theme = 'default',
	setTheme = false,
	className,
	size = 'medium',
	placeholder,
	label,
	spellcheck = false,
	name,
	onChange = () => {}
}) => {
	const [focused, setFocused] = useState(false)
	const [hasValue, setHasValue] = useState(false)

	const renderIcon = (icon, size, iconPosition, theme) => {
		let renderedIcon = false
		let iconClassName = 'input-icon absolute flex items-center justify-center top-0 pointer-events-none overflow-hidden w-[var(--input-height) h-[var(--input-height)]'
		if (iconPosition === 'right') {
			iconClassName += ' right-0'
		} else {
			iconClassName += ' left-0'
		}
		renderedIcon = <div className={iconClassName} size={size} iconPosition={iconPosition} theme={theme}>{icon}</div>
		return renderedIcon
	}

	const setFocusState = () => {
		if (value) {
			setFocused(true)
		} else {
			setFocused(false)
		}
	}

	let inputWrapperClassName = 'input-component relative inline-block w-full'
	if (className) {
		inputWrapperClassName += ' ' + className
	}
	if (error) {
		inputWrapperClassName += ' error'
	}
	if (success) {
		inputWrapperClassName += ' success'
	}
	if (loading) {
		inputWrapperClassName += ' loading'
	}
	if (disabled) {
		inputWrapperClassName += ' disabled'
	}
	if (size) {
		inputWrapperClassName += (' ' + size)
	}
	if (label) {
		inputWrapperClassName += ' has-label'
	}
	if (placeholder) {
		inputWrapperClassName += ' has-placeholder'
	}
	if (hasValue) {
		inputWrapperClassName += ' has-value'
	}
	if (icon && iconPosition) {
		inputWrapperClassName += ' icon-' + iconPosition
	}

	let inputClassName = 'input'
	if (icon && iconPosition === 'right') {
		inputWrapperClassName += ' pr-[var(--input-height)]'
	} else if (icon) {
		inputWrapperClassName += ' pl-[var(--input-height)]'
	}

	return (
		<div className={inputWrapperClassName} theme={setTheme || theme} data-focused={focused}>
			<input
				className={inputClassName}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				onClick={onClick}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocusState()}
				onChange={event => {
					if (onChange) {
						onChange(event)
					}
					if (event?.target?.value) {
						setFocused(true)
					}
				}}
				value={value}
				name={name}
				id={name}
				spellCheck={spellcheck}
			/>
			{label && (
				<label
					icon={icon}
					size={size}
					htmlFor={name}
					className='input-label'
				>
					{label}
				</label>
			)}
			{icon && (
				this.renderIcon(icon, size, iconPosition, theme)
			)}
		</div>
	)
}

export default Input
