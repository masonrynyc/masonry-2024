import React from 'react'
import RichText from '@components/RichText'
import Image from '@components/Image'
import Link from '@components/Link'
import ProfileImage from '@components/ProfileImage'
import { getDocumentLink, portableToPlainText } from '@utils/helpers'
import dayjs from 'dayjs'

const PostCard = ({ className = '', post }) => {
	let eyebrow = post?.category?.title
	let author = post?.author
	let baseClassname = 'post-card block relative'
	// let postDate = dayjs(post?.publishedAt).format('MMMM D, YYYY')
	if (post.featuredImage) {
		return (
			<div className={className ? className + ' ' + baseClassname : baseClassname}>
				<div className="mb-gutter">
					<Image
						transitionIn={false}
						image={post.featuredImage}
						ratio={1.5}
						alt={post.title + ' featured image'}
					/>
				</div>
				{post?.category && (
					<div>
						<Link
							{...getDocumentLink(post.category, false, false, false, 'View articles in category ' + post.category.title)}
							className="inline-flex gap-x-2 items-center justify-start body-small relative z-1 align-top"
						>
							{post.category?.title}
						</Link>
					</div>
				)}
				<Link
					{...getDocumentLink(post, false, false, false, 'Read ' + post.title)}
					className=''
				>
					<div>
						<h4>{post?.title}</h4>
						<div className='absolute top-0 left-0 w-full h-full'/>
					</div>
				</Link>
				{author && (
					<div>
						<Link
							{...getDocumentLink(author, false, false, false, 'View articles by ' + author.name)}
							className="relative z-1 block"
						>
							<div className='inline-flex gap-x-2 items-center justify-start align-top'>
								<ProfileImage
									image={author.headshot}
									title={author.name}
								/>
								<p className='body-small'>by {author.name}</p>
							</div>
						</Link>
					</div>
				)}
				{post?.excerpt && (
					<div>
						{portableToPlainText(post.excerpt)}
					</div>
				)}
				<div className='cursor-pointer' role='button' tabIndex='0'>Read More</div>
			</div>
		)
	}

	// No Featured Image
	baseClassname = 'post-card flex flex-col relative bg-light-grey p-gutter h-full gap-y-gutter justify-between max-w-full aspect-square'
	return (
		<div className={className ? className + ' ' + baseClassname : baseClassname}>
			<div>
				{post?.category && (
					<div>
						<Link
							{...getDocumentLink(post.category, false, false, false, 'View articles in category ' + post.category.title)}
							className="inline-flex gap-x-2 items-center justify-start body-small relative z-1 align-top"
						>
							{post.category?.title}
						</Link>
					</div>
				)}
				<Link
					{...getDocumentLink(post, false, false, false, 'Read ' + post.title)}
					className=''
				>
					<div>
						<h4 className='h3'>{post?.title}</h4>
						<div className='absolute top-0 left-0 w-full h-full'/>
					</div>
				</Link>
				{author && (
					<div>
						<Link
							{...getDocumentLink(author, false, false, false, 'View articles by ' + author.name)}
							className="relative z-1 block"
						>
							<div className='inline-flex gap-x-2 items-center justify-start align-top'>
								<ProfileImage
									image={author.headshot}
									title={author.name}
								/>
								<p className='body-small'>by {author.name}</p>
							</div>
						</Link>
					</div>
				)}
				{post?.excerpt && (
					<RichText text={post.excerpt} />
				)}
			</div>
			<div className='cursor-pointer' role='button' tabIndex='0'>Read More</div>
		</div>
	)
}

export default PostCard
