// Selecting Elements
const queries = ['pasta', 'samosa', 'dosa', 'idli', 'vada', 'nuggets', 'maggi', 'mojito', 'momos', 'spaggheti', 'franky', 'cake'];
const specialDish = document.getElementById('special-dish');
const wishMessage = document.getElementById('wish-user');
let heroHeader = document.querySelector('.hero__header');
const readyInMinutes = document.getElementById('readyInMinutes');
const title = document.getElementById('title');
const serving = document.getElementById('servings');
const specialDishLink = document.getElementById('special-dish-link');
const related1Title = document.getElementById('related-1-title');
const related2Title = document.getElementById('related-2-title');
const related3Title = document.getElementById('related-3-title');
const related1ReadyIn = document.getElementById('related-1-readyIn');
const related2ReadyIn = document.getElementById('related-2-readyIn');
const related3ReadyIn = document.getElementById('related-3-readyIn');
const related1Source = document.getElementById('related-1-source');
const related2Source = document.getElementById('related-2-source');
const related3Source = document.getElementById('related-3-source');

// Wish According To The Local Time
let wish;
const date = new Date();
let hours = date.getHours();

const displayWishMessage = () => {
	wishMessage.innerHTML = `${wish}`;
};

function calculateTime() {
	if (hours >= 4 && hours <= 12) {
		wish = 'Good Morning';
	} else if (hours > 12 && hours <= 16) {
		wish = 'Good Afternoon';
	} else{
		wish = 'Good Evening';
		heroHeader.style.backgroundImage = "url(imgs/hero/blue.svg)";
	}
	displayWishMessage();
}

calculateTime();

////////// ------------------- \\\\\\\\\\\

function randomSpecialDish(queries) {
	return queries[Math.floor(Math.random()*queries.length)];
}

// special dish information
specialDishInfo = {};

relatedDishesInfo = {};
relatedDishesInfo.item1 ={};
relatedDishesInfo.item2 ={};
relatedDishesInfo.item3 ={};

// get special recipe image
const getData = async(url = '') => {
	const response = await fetch(url);
		try {
			const data = await response.json();
			console.log(data);
			return data;
		} catch(error) {
			console.log("error ", error);
	}
};

apiKey = 'b8813cf59b754c8ca4b755c67e805499';
url = `https://api.spoonacular.com/recipes/search?query=${randomSpecialDish(queries)}&number=4&apiKey=${apiKey}`;
getData(url).then(function(data) {
	// Special Dish Info
	specialDishInfo.baseUrl = data.baseUri;
	specialDishInfo.image = data.results[0].image;
	specialDishInfo.readyInMinutes = data.results[0].readyInMinutes;
	specialDishInfo.servings = data.results[0].servings;
	specialDishInfo.title = data.results[0].title;
	specialDishInfo.source = data.results[0].sourceUrl;

	// related Dishes Info
	// item1 info
	relatedDishesInfo.item1.title = data.results[1].title;
	relatedDishesInfo.item1.readyInMinutes = data.results[1].readyInMinutes;
	relatedDishesInfo.item1.source = data.results[1].sourceUrl;

	// item2 info
	relatedDishesInfo.item2.title = data.results[2].title;
	relatedDishesInfo.item2.readyInMinutes = data.results[2].readyInMinutes;
	relatedDishesInfo.item2.source = data.results[2].sourceUrl;

	// item3 info
	relatedDishesInfo.item3.title = data.results[3].title;
	relatedDishesInfo.item3.readyInMinutes = data.results[3].readyInMinutes;
	relatedDishesInfo.item3.source = data.results[3].sourceUrl;

}).then(function() {
	console.log(specialDishInfo);
	specialDish.style.backgroundImage = `url(${specialDishInfo.baseUrl}${specialDishInfo.image})`;
	title.innerHTML = `${specialDishInfo.title}`;
	readyInMinutes.innerHTML = `${specialDishInfo.readyInMinutes}`;
	servings.innerHTML = `${specialDishInfo.servings}`;
	specialDishLink.setAttribute('href', `${specialDishInfo.source}`);
}).then(function() {
	related1Title.innerHTML = `${relatedDishesInfo.item1.title}`;
	related1ReadyIn.innerHTML = `${relatedDishesInfo.item1.readyInMinutes}`;
	related1Source.setAttribute('href', `${relatedDishesInfo.item1.source}`);

	related2Title.innerHTML = `${relatedDishesInfo.item2.title}`;
	related2ReadyIn.innerHTML = `${relatedDishesInfo.item2.readyInMinutes}`;
	related2Source.setAttribute('href', `${relatedDishesInfo.item2.source}`);

	related3Title.innerHTML = `${relatedDishesInfo.item3.title}`;
	related3ReadyIn.innerHTML = `${relatedDishesInfo.item3.readyInMinutes}`;
	related3Source.setAttribute('href', `${relatedDishesInfo.item3.source}`);
})