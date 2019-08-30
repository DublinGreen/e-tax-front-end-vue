import { AUTHENTICATE, LOGOUT, CHECKPERMISSION, CHECKIFALLOWED } from '@/utils/mutation-types';

import { webAuthentication, webSignin, webFirstTimeResetPassword } from '@/utils/route';

export const state = () => ({
	user: false,
	userPermissions: [],
	token: ''
});

export const mutations = {
	[AUTHENTICATE](state, payload) {
		state.user = payload;
		state.userPermissions = payload.user_permissions;
		state.token = payload.Token;

		this.$axios.setHeader('Authorization', `Bearer ${state.token}`);
	},

	[LOGOUT](state) {
		state.user = false;
		state.userPermissions = [];
	},

	[CHECKPERMISSION](state, payload) {
		if (payload.some((r) => state.userPermissions.includes(r))) {
			return true;
		} else {
			this.$toast.error('You are not authorized to access this page');
			this.$router.push('/dashboard');
		}
	},

	[CHECKIFALLOWED](state, payload) {
		if (payload.some((r) => state.userPermissions.includes(r))) {
			return true;
		} else {
			return false;
		}
	}
};

export const actions = {
	async authenticate({ commit }, payload) {
		try {
			const response = await this.$axios.$post(webFirstTimeResetPassword, payload);
			const { Token: token } = res.data;
			this.$axios.setHeader('Authorization', `Bearer ${token}`);
			commit(AUTHENTICATE, response.data);
		} catch (e) {}
	},

	async keepuser({ commit }, payload) {
		commit(AUTHENTICATE, payload);
	},

	async checkPermission({ commit }, payload) {
		commit(CHECKPERMISSION, payload);
	},

	async canPerform({ commit }, payload) {
		commit(CHECKIFALLOWED, payload);
	}
};

export const getters = {
	authUser: (state) => {
		const { FirstName, LastName } = state.user;
		return `${FirstName} ${LastName}`;
	},

	authenticated: (state) => {
		if (state.user) {
			return true;
		}
		return false;
	},

	token: (state) => {
		if (state.token) {
			return state.token;
		}
	},

	
};
