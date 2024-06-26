import React from 'react'
import ReactModal from 'react-modal'
import Button from '@components/Button'
import { MdClose } from 'react-icons/md'

const modalStyles = ({ speed }) => ({
	content: {
		'--speed': `${speed}ms`,
		top: null,
		left: null,
		right: null,
		bottom: null,
		border: null,
		overflow: null,
		WebkitOverflowScrolling: null,
		borderRadius: 0,
		background: 'var(--bg-color)',
		position: 'relative',
		outline: 'none',
		transition: `opacity ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
		margin: 'auto',
		padding: null
	},
	overlay: {
		'--speed': `${speed}ms`,
		zIndex: 10,
		position: 'fixed',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		background: 'transparent',
		justifyContent: 'center',
		pointerEvents: 'click',
		overflow: 'auto',
		transition: `background ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
		padding: '5vw 0'
	},
})

const drawerStyles = ({ position = 'left', speed }) => ({
	content: {
		'--speed': `${speed}ms`,
		top: null,
		left: null,
		right: null,
		bottom: null,
		border: null,
		overflowX: 'hidden',
		overflowY: 'auto',
		WebkitOverflowScrolling: null,
		borderRadius: 0,
		background: 'var(--bg-color)',
		position: 'relative',
		outline: 'none',
		transition: `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
		margin: '0',
		maxWidth: '100%'
	},
	overlay: {
		'--speed': `${speed}ms`,
		zIndex: 10,
		position: 'fixed',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'stretch',
		background: 'transparent',
		justifyContent: position === 'right' ? 'flex-end' : 'flex-start',
		pointerEvents: 'click',
		overflow: 'hidden',
		opacity: 1,
		transition: `background ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
		padding: '0'
	},
})

const Modal = ({
	className = '',
	open = false,
	title = 'Modal',
	drawer = true,
	closeModal = () => {},
	onOpen = () => {},
	onClose = () => {},
	children,
	hideClose,
	speed = 750
}) => {
	if (drawer) {
		if (typeof drawer === 'string') {
			className = className + ' drawer drawer-' + drawer
		} else {
			className = className + ' drawer'
		}
	}

	const onRequestClose = () => {
		closeModal()
		onClose()
	}

	return (
		<>
			<ReactModal
				className={className}
				isOpen={open}
				style={drawer ? drawerStyles({ speed: speed, position: drawer || 'left' }) : modalStyles({ speed: speed })}
				shouldCloseOnOverlayClick={true}
				onRequestClose={() => onRequestClose()}
				onAfterOpen={onOpen}
				closeTimeoutMS={speed}
			>
				{!hideClose && (
					<Button
						onClick={closeModal}
						title={'Close ' + title}
						icon={<MdClose size={24}/>}
						className='transparent unpadd absolute top-margin right-margin'
						shape='circle'
					/>
				)}
				{children}
			</ReactModal>
		</>
	)
}

export default Modal
