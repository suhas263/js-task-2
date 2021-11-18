import './App.css';
import ReactWordCloud from 'react-wordcloud';
import { React, useState, useEffect } from 'react';
import DetailCard from './components/DetailCard';
import Header from './components/Header';
import InfoBox from './components/InfoBox';

function App() {
	const [topics, setTopics] = useState({});
	const [currWord, setCurrWord] = useState({});

	const getData = () => {
		fetch('data.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((myjson) => {
				setTopics(myjson.topics);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	const onWordClick = (word) => {
		setCurrWord(word);
	};

	const words =
		topics &&
		topics.length > 0 &&
		topics.map((topic) => {
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

	// ReactWordCloud callbacks
	const callbacks = {
		getWordColor: (word) => topicColorConfigurator(word.sentimentScore),
		onWordClick: (word) => onWordClick(word),
	};

	// ReactWordCloud config
	const options = {
		rotations: 2,
		rotationAngles: [0],
		fontSizes: [20, 80],
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontFamily: 'arial',
		padding: 3.5,
		deterministic: true,
		enableTooltip: false,
		spiral: 'archimedean',
	};

	return (
		<div className='App'>
			<Header />
			{topics && topics.length > 0 ? (
				<div className='word-cloud-container'>
					<div className='word-cloud'>
						<ReactWordCloud
							callbacks={callbacks}
							words={words}
							options={options}
						/>
					</div>
					<DetailCard
						word={currWord}
						color={callbacks.getWordColor(currWord)}
					/>
				</div>
			) : (
				<InfoBox />
			)}
		</div>
	);
}

export default App;

// topic cloud configs
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
