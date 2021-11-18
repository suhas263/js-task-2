import './DetailCard.css';

const DetailCard = ({ word, color }) => {
	const {
		text,
		volume,
		negativeSentiment,
		positiveSentiment,
		neutralSentiment,
	} = word;
	const wordColor = color;

	console.log(word);

	return (
		<div className='detail-card'>
			{Object.keys(word).length === 0 ? (
				emptyCard
			) : (
				<>
					<div className='detail-card-header' style={{ color: `${wordColor}` }}>
						Detailed info on "{text}"
					</div>
					<div className='detail-volume'>
						<p>
							Total mentions:
							<span className='score'>{volume}</span>
						</p>
						<p style={{ color: 'green' }}>
							Positive mentions:
							<span className='score'>{positiveSentiment}</span>
						</p>
						<p style={{ color: 'red' }}>
							Negative mentions:
							<span className='score'>{negativeSentiment}</span>
						</p>
						<p style={{ color: 'gray' }}>
							Neutral mentions:
							<span className='score'>{neutralSentiment}</span>
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default DetailCard;

const emptyCard = (
	<div className='empty-detail-card-card'>
		<p>Click on a topic to get more info</p>
	</div>
);
