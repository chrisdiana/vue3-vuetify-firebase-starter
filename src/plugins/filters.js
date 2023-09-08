export function registerFilters(app) {
	app.config.globalProperties.$filters = {
	  foo(value) {
	  	return value
	  }
	}
}