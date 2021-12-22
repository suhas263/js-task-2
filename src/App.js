import './App.css';
import ReactWordCloud from 'react-wordcloud';
import { React, useState, useEffect } from 'react';
import DetailCard from './components/DetailCard';
import Header from './components/Header';
import ErrorState from './components/states/ErrorState';
import LoadingState from './components/states/LoadingState';
import EmptyResults from './components/states/EmptyResults';

function App() {
	const [topics, setTopics] = useState([]);
	const [currWord, setCurrWord] = useState({});
	const [hasError, setHasError] = useState(false);
	const [dataHasLoaded, setDataHasLoaded] = useState(false);

	const getData = () => {
		fetch('sddata.json')
			.then(async (res) => {
				if (res.status >= 200 && res.status < 400) {
					setDataHasLoaded(true);
					return res.json();
				} else {
					const errorResponse = await res.json();
					throw new Error(errorResponse);
				}
			})
			.then((myjson) => {
				setTopics(myjson.topics);
				// will set the word cloud to an empty array
				// setTopics([]);
			})
			.catch((err) => {
				setHasError(true);
				console.log(err);
			});
	};

	useEffect(() => {
		const loadingData = setTimeout(() => {
			getData();
		}, 2000);

		return () => {
			clearInterval(loadingData);
		};
	}, []);

	const onWordClick = (word) => {
		setCurrWord(word);
	};

	const words =
		topics &&
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

	const wordCloudContainer = (
		<>
			{words.length > 0 ? (
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
				<EmptyResults />
			)}
		</>
	);

	const containerContent = !hasError ? wordCloudContainer : <ErrorState />;

	return (
		<div className='App'>
			<Header />
			<div className='container'>
				{!dataHasLoaded ? <LoadingState /> : containerContent}
			</div>
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
