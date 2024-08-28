import React, { useRef, useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Button from '@components/Button'
import { MdClose, MdPlayArrow } from 'react-icons/md'

const Video = ({
	className = '',
	vimeoId,
	videoFile,
	cover = true,
	ratio = 16/9,
	playing = true,
	loop = true,
	muted = true,
	autoplay = true,
	controls = false,
	clickToPlay = false,
	videoPlaySetting,
	setVideoDuration = () => {},
	videoDuration,
	onProgress = () => {},
	onEnd = () => {},
	setRatioFn = () => {}
}) => {

	if (clickToPlay) {
		playing = false
	}

	const [loaded, setLoaded] = useState(false)
	const [isPlaying, setIsPlaying] = useState(playing)
	const [hasWindow, setHasWindow] = useState(false)
	const [isMuted, setIsMuted] = useState(muted)
	const [showControls, setShowControls] = useState(controls)
	const [aspectRatio, setAspectRatio] = useState(ratio)
	const [playerRatio, setPlayerRatio] = useState(ratio)
	const videoWrapper = useRef(null)
	const videoPlayer = useRef(null)

	let videoUrl = false
	if (vimeoId) {
		videoUrl = 'https://vimeo.com/' + vimeoId
	}

	if (videoFile) {
		videoUrl = videoFile.url
	}

	const setDuration = () => {
		if (!videoDuration) {
			setVideoDuration(videoPlayer?.current?.getDuration())
		}
	}

	const handlePlay = () => {
		setIsPlaying(true)
		setShowControls(true)
		setIsMuted(false)
	}

	const handleStop = () => {
		if (!loop) {
			videoPlayer?.current?.showPreview()
			videoPlayer?.current?.seekTo(0)
			setIsPlaying(false)
			setShowControls(false)
			setIsMuted(true)
		}
		onEnd()
	}

	const getAspectRatio = () => {
		const containerW = videoWrapper?.current?.offsetWidth
		const containerH = videoWrapper?.current?.offsetHeight
		const ratio = containerW / containerH
		if (ratio !== aspectRatio && ratio !== Infinity) {
			setAspectRatio(containerW / containerH)
			setRatioFn(playerRatio)
		}
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
      setHasWindow(true)
    }
		getAspectRatio()

		if (clickToPlay) {
			setIsMuted(false)
		}

		// window.addEventListener("resize", getAspectRatio); // add event listener
		// return () => {
		// 	window.removeEventListener("resize", getAspectRatio); // clean up
		// }
	}, [])

	if (!videoUrl) {
		return false
	}

	const handleProgress = event => {
		onProgress(event)
	}

	const onPlay = () => {
		setDuration()
	}

	const onReady = () => {
		setLoaded(true)
		setDuration()
		getAspectRatio()

		if (hasWindow) {
			const playerAspectDiv = videoPlayer?.current?.player?.player?.container?.firstChild?.getBoundingClientRect()
			const videoW = playerAspectDiv?.width
			const videoH = playerAspectDiv?.height
			const newPlayerRatio = videoW / videoH
			if (playerRatio !== newPlayerRatio) {
				setPlayerRatio(newPlayerRatio)
			}
		}
	}

	return (
		<>
			<div
				className={`${videoFile ? 'mp4' : 'vimeo'} video-wrapper ${cover ? 'cover' : ''} ${aspectRatio < playerRatio ? 'portrait' : 'landscape'} ${className}`}
				ref={videoWrapper}
				style={{ '--ratio': playerRatio }}
			>
				{/* {(clickToPlay && isPlaying) && (
					<Button
						onClick={handleStop}
						shape='circle'
						icon={<MdClose size={24}/>}
						title='Stop Video'
						className='transparent absolute top-gutter right-gutter z-2'
					/>
				)} */}
				{hasWindow && (
					<ReactPlayer
						ref={videoPlayer}
						url={videoUrl}
						onEnded={handleStop}
						onClickPreview={handlePlay}
						playing={isPlaying}
						loop={!clickToPlay}
						muted={isMuted}
						volume={isMuted ? 0 : .5}
						autoPlay={autoplay}
						controls={showControls}
						playsinline={autoplay}
						onReady={onReady}
						onPlay={onPlay}
						onProgress={handleProgress}
						playIcon={
							<div className='group hover:bg-[rgba(0,0,0,.7)] transition-all z-10 absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] flex items-center justify-center'>
								<div className="relative transition-color hover:text-true-black rounded-full flex items-center justify-center w-[66px] sm:w-[80px] lg:w-[100px] 2xl:w-[120px] aspect-square text-[32px] sm:text-[42px] lg:text-[48px] 2xl:text-[56px]">
									<MdPlayArrow size='1em' className='relative z-2 pointer-events-none'/>
									<div className="absolute z-1 w-full h-full top-0 left-0 rounded-full hover:bg-white border-white group-hover:scale-[1.1] transition-all border"/>
								</div>
							</div>
						}
						// light={clickToPlay}
						config={{
							vimeo: {
								playerOptions: {
									responsive: true,
									controls: clickToPlay,
									colors: ['000000', 'ffffff', 'ffffff', '000000'] //[Primary, Accent, Text/Icon, Background]
								}
							}
						}}
					/>
				)}
			</div>
		</>
	)
}

export default Video
