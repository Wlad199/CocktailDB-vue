import axios from 'axios'
import { createStore } from 'vuex'

const URL = 'https://www.thecocktaildb.com/api/json/v1/1'

const COCKTAILS_CATEGORY = {
	nonAlcoholic: 'filter.php?a=Non_Alcoholic',
	alcoholic: 'filter.php?a=Alcoholic',
	ordinary: 'filter.php?c=Ordinary_Drink',
	cocktail: 'filter.php?c=Cocktail',
	glass: 'filter.php?g=Cocktail_glass',
	champagne: 'filter.php?g=Champagne_flute'
}

const state = {
	cocktails: [],
	chossenCategory: COCKTAILS_CATEGORY['nonAlcoholic'],
	inputValue: '',
	firstLetter: '',
	isLoaded: 'pending',
	errorMessage: ''
}

const mutations = {
	getCoctails(state, payload) {
		state.cocktails = payload
	},
	changeCategory(state, payload) {
		state.chossenCategory = COCKTAILS_CATEGORY[payload]
	},
	refreshPage() {
		location.reload();
	},
	chooseFirstLetter(state, payload) {
		state.firstLetter = payload
	},
	changeStatusLoading(state, payload) {
		state.isLoaded = payload
	},
	setErrorMessage(state, payload) {
		state.errorMessage = payload
	}
}

const actions = {
	async fetchCoctails(context, category) {
		if (category) {
			context.commit('changeCategory', category)
		} else {
			context.commit('changeCategory', 'nonAlcoholic')
		}
		try {
			context.commit('changeStatusLoading', 'loading')
			const response = await axios.get(`${URL}/${context.state.chossenCategory}`)
			context.commit('getCoctails', response.data.drinks)
			context.commit('changeStatusLoading', 'sucsess')

		} catch (err) {
			console.warn(err.message)
			context.commit('changeStatusLoading', 'error')
			context.commit('setErrorMessage', err.message)
		}
	}
}

const getters = {
	search: (state) => {
		const filteredList = state.cocktails.filter(cocktail => {
			return cocktail.strDrink.toLowerCase().includes(state.inputValue.toLowerCase())
		})
		if (!state.firstLetter) {
			return filteredList
		} else {
			return filteredList.filter(cocktail => {
				return cocktail.strDrink.toUpperCase()[0] === state.firstLetter
			})
		}
	}
}



export default createStore({
	state,
	mutations,
	actions,
	getters
})