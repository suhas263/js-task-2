import './DetailCard.css';

const DetailCard = ({ word }) => {
	const {
		id,
		text,
		value,
		volume,
		sentimentScore,
		negativeSentiment,
		positiveSentiment,
		neutralSentiment,
	} = word;

	// console.log(Object.keys(word));
	console.log(word);

	return (
		<>
			{Object.keys(word).length === 0 ? null : (
				<div className='detail-card'>
					<div className='detail-card-header'>Detailed info on "{text}"</div>
					<ul className='detail-volume'>
							<li className='score'>Total mentions: {volume}</li>
							<li className='score'>Positive mentions: {positiveSentiment}</li>
							<li className='score'>Negative mentions: {negativeSentiment}</li>
							<li className='score'>Neutral mentions: {neutralSentiment}</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default DetailCard;
