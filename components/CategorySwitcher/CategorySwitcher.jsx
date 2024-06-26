import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getClient } from '@lib/sanity'
import { getDocumentLink, getRoute } from '@utils/helpers'

// Category Queries
import { allCategories } from '@queries/category'

const CategorySwitcher = ({
	className = '',
	docType = 'post',
	viewAllLabel = 'All Articles'
}) => {
	const router = useRouter()
	const [categories, setCategories] = useState([])

	const catDocs = {
		post: {
			category: 'category',
			query: allCategories
		}
		// Add object for other document types with categories
	}

	useEffect(() => {
		let query = catDocs[docType].query
		// Add query for other category documents (ie: projectCategory)
		getClient().fetch(query).then((res) => {
			setCategories(res)
		})
	})

	const handleFilter = event => {
		const catUrl = getDocumentLink({
			slug: event?.target?.value,
			_type: catDocs[docType].category
		}).to

    if (event?.target?.value !== 'all') {
			router.push(catUrl)
    } else {
      router.push('/' + getRoute[docType])
    }
  }

	return (
		<div className={className}>
			<select
				name="category-filters"
				id="categories"
				onChange={handleFilter}
			>
				<option
					value='all'
					selected={router.asPath === '/' + getRoute[docType]}
				>
					{viewAllLabel}
				</option>
				{categories.map(category => (
					<option
						key={category._id}
						value={category.slug}
						selected={router.query.slug === category.slug}
					>
						{category.title}
					</option>
				))}
			</select>
		</div>
	)
}

export default CategorySwitcher
