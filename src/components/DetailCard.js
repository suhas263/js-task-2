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
		<div>
			{Object.keys(word).length === 0 ? null : (
				<div className='detail-card'>
					<h2>Detailed info on the topic "{text}"</h2>
					<div className='detail-volume'>
						<p>
							Total mentions:
							<span className='volume-score score'>{volume}</span>
						</p>
					</div>
					<div className='detail-sentiment'>
						<ul className='sentiment-card'>
							<li>
								Positive mentions:
								<span className='positive-score score'>{positiveSentiment}</span>
							</li>
							<li>
								Negative mentions:
								<span className='negative-score score'>{negativeSentiment}</span>
							</li>
							<li>
								Neutral mentions:
								<span className='neutral-score score'>{neutralSentiment}</span>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default DetailCard;
