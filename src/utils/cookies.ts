class Cookie {
	setCookie(name: string, value: string, days?: number) {
		let expires = '';
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = `; expires=${date.toUTCString()}`;
		}

		document.cookie = `${name}=${value || ''}${expires}; path=/`;
	}

	getCookie(name: string) {
		const nameEquiv = `${name}=`;
		const ca = document.cookie.split(';');
		// Loop through the cookies
		for (let c of ca) {
			while (c.startsWith(' ')) {
				c = c.substring(1, c.length);
			}

			if (c.startsWith(nameEquiv)) {
				return c.substring(nameEquiv.length, c.length);
			}
		}

		return null;
	}

	eraseCookie(name: string) {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}
}

export default new Cookie();