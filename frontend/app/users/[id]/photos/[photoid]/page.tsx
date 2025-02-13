interface PhotoDetailPageProps {
	params: {
		id: number
		photoid: number
	}
}

const PhotoDetailPage = ({ params: { id, photoid } }: PhotoDetailPageProps) => {
	return (
		<div>
			PhotoDetailPage id={id} photoid={photoid}
		</div>
	)
}

export default PhotoDetailPage
