import React, { useEffect, useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { createStore } from "https://esm.sh/redux";
import { Provider, useDispatch, useSelector } from "https://esm.sh/react-redux";

// Redux actions
const SET_RANDOM_QUOTE = "SET_RANDOM_QUOTE";

// Action creator
const setRandomQuote = () => ({
	type: SET_RANDOM_QUOTE,
});

// Reducer
const initialState = {
	quotes: [
		{
			text: "The only way to do great work is to love what you do.",
			author: "Steve Jobs",
		},
		{
			text: "In the middle of difficulty lies opportunity.",
			author: "Albert Einstein",
		},
		{
			text: "Believe you can and you're halfway there.",
			author: "Theodore Roosevelt",
		},
		{
			text: "It does not matter how slowly you go as long as you do not stop.",
			author: "Confucius",
		},
		{
			text: "The only limit to our realization of tomorrow will be our doubts of today.",
			author: "Franklin D. Roosevelt",
		},
		{
			text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
			author: "Winston Churchill",
		},
		{
			text: "The only impossible journey is the one you never begin.",
			author: "Tony Robbins",
		},
		{
			text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
			author: "Zig Ziglar",
		},
		{
			text: "The way to get started is to quit talking and begin doing.",
			author: "Walt Disney",
		},
		{
			text: "Don't watch the clock; do what it does. Keep going.",
			author: "Sam Levenson",
		},
		{
			text: "You are never too old to set another goal or to dream a new dream.",
			author: "C.S. Lewis",
		},
		{
			text: "The future belongs to those who believe in the beauty of their dreams.",
			author: "Eleanor Roosevelt",
		},
		{
			text: "The best time to plant a tree was 20 years ago. The second best time is now.",
			author: "Chinese Proverb",
		},
		{ text: "Your limitation—it's only your imagination.", author: "Unknown" },
		{
			text: "Push yourself, because no one else is going to do it for you.",
			author: "Unknown",
		},
		{ text: "Great things never come from comfort zones.", author: "Unknown" },
		{ text: "Dream it. Wish it. Do it.", author: "Unknown" },
		{
			text: "Success doesn’t just find you. You have to go out and get it.",
			author: "Unknown",
		},
	],
	currentQuote: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_RANDOM_QUOTE: {
			const { quotes } = state;
			const randomIndex = Math.floor(Math.random() * quotes.length);
			const randomQuote = quotes[randomIndex];
			return {
				...state,
				currentQuote: randomQuote,
			};
		}
		default:
			return state;
	}
};

// Store
const store = createStore(reducer);

// Component
const QuoteDisplay = () => {
	const dispatch = useDispatch();
	const currentQuote = useSelector((state) => state.currentQuote);
	const [randomColor, setRandomColor] = useState("#FFFFFF"); // Initial color

	useEffect(() => {
		dispatch(setRandomQuote());
		setRandomColor(generateRandomColor());
	}, [dispatch]);

	const generateRandomColor = () => {
		return "#" + Math.floor(Math.random() * 16777215).toString(16); // Random hex color code
	};

	const handleNewQuote = () => {
		dispatch(setRandomQuote());
		setRandomColor(generateRandomColor()); // Update color when new quote is displayed
	};

	const shareOnTwitter = () => {
		if (currentQuote) {
			const tweetText = encodeURIComponent(
				`"${currentQuote.text}" - ${currentQuote.author}`
			);
			const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
			window.open(tweetUrl, "_blank");
		}
	};

	return (
		<div
			id="quote-box"
			className="min-h-screen flex flex-col items-center justify-center"
			style={{ backgroundColor: randomColor }}>
			<div className="max-w-md w-5/6 bg-white p-8 rounded-md shadow-md container mx-auto">
				{currentQuote && (
					<div className="text-center">
						<p
							id="text"
							className="text-xl font-semibold"
							style={{ color: randomColor }}>
							{currentQuote.text}
						</p>
						<p
							id="author"
							className="text-gray-600 mt-4"
							style={{ color: randomColor }}>
							- {currentQuote.author}
						</p>
						<div className="flex justify-between mt-8">
							<a
								id="tweet-quote"
								href="https://twitter.com/intent/tweet"
								target="_blank"
								onClick={shareOnTwitter}
								className="p-3 rounded-md bg-white text-white"
								style={{ backgroundColor: randomColor }}
								rel="noreferrer">
								<i className="fab fa-twitter"></i>
							</a>
							<button
								id="new-quote"
								onClick={handleNewQuote}
								className="px-6 py-3 rounded-md text-white font-semibold hover:bg-blue-600 transition duration-300"
								style={{ backgroundColor: randomColor }}>
								New Quote
							</button>
						</div>
					</div>
				)}
			</div>
			<br />
			<div id="madeby" className="mt-4 text-white">
				by - rohitkrdevs
			</div>
		</div>
	);
};

ReactDOM.render(
	<Provider store={store}>
		<QuoteDisplay />
	</Provider>,
	document.getElementById("root")
);
