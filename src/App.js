import './App.css';
import ReactWordCloud from 'react-wordcloud';
import { React } from 'react';
import { useState } from 'react';
import topicsJson from './topics.json';
import DetailCard from './components/DetailCard';
import PopUp from './components/PopUp';

function App() {
	const [topics, setTopics] = useState(topicsJson.topics);
	const [currWord, setCurrWord] = useState({});
	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const onWordClick = (word) => {
		setCurrWord(word);
		togglePopup();
	};

	const wordSizeCalculator = (size) => {
		if (size > 0 && size <= 20) {
			return 20;
		} else if (size > 20 && size <= 40) {
			return 40;
		} else if (size > 40 && size <= 60) {
			return 60;
		} else if (size > 60 && size <= 100) {
			return 80;
		} else if (size > 100) {
			return 100;
		}
	};

	const topicColorConfigurator = (score) => {
		if (score > 60) {
			return 'green';
		} else if (score < 40) {
			return 'red';
		} else {
			return 'grey';
		}
	};

	const setSentimentScore = (score) => {
		return score ? score : 0;
	};

	const words = topics.map((topic) => {
		return {
			id: topic.id,
			text: topic.label,
			value: wordSizeCalculator(topic.volume),
			volume: topic.volume,
			sentimentScore: topic.sentimentScore,
			negativeSentiment: setSentimentScore(topic.sentiment.negative),
			positiveSentiment: setSentimentScore(topic.sentiment.positive),
			neutralSentiment: setSentimentScore(topic.sentiment.neutral),
		};
	});
	// console.log(words);

	const callbacks = {
		getWordColor: (word) => topicColorConfigurator(word.sentimentScore),
		onWordClick: (word) => onWordClick(word),
	};

	const options = {
		rotations: 2,
		rotationAngles: [0],
		fontSizes: [20, 80],
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontFamily: 'arial',
		padding: 0.5,
		deterministic: false,
		enableTooltip: false,
		// scale: 'sqrt',
    spiral: 'archimedean',
	};

	return (
		<div className='App'>
			<div className='topic-cloud'>
				<h1> My Topic Cloud </h1>
				<ReactWordCloud callbacks={callbacks} words={words} options={options} />
			</div>
			{isOpen && (
				<PopUp
					content={<DetailCard word={currWord} />}
					handleClose={togglePopup}
				/>
			)}
		</div>
	);
}

export default App;
