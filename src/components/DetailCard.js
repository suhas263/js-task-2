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
				<EmptyCard />
			) : (
				<>
					<div className='detail-card-header' style={{ color: `${wordColor}` }}>
						Detailed info on "{text}"
					</div>
					<div className='detail-volume'>
						<VolumeCard text={"Total mentions:"} score={volume} />
						<VolumeCard text={"Positive mentions:"} score={positiveSentiment} textColor={"green"}/>
						<VolumeCard text={"Negative mentions:"} score={negativeSentiment} textColor={"red"}/>
						<VolumeCard text={"Neutral mentions:"} score={neutralSentiment} textColor={"gray"}/>
					</div>
				</>
			)}
		</div>
	);
};

export default DetailCard;

const EmptyCard = () => {
	return (
	<div className='empty-detail-card-card'>
		<p>Click on a topic to get more info</p>
	</div>
	);
};

const VolumeCard = ({ text, score, textColor }) => {
	return (
	<p style={{ color: textColor}}>
		{text}
		<span className='score'>{score}</span>
	</p>
	);
};